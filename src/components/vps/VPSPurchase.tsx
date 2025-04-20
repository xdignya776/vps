import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from '@/hooks/use-toast';
import { DigitalOceanSize, DigitalOceanRegion, createDroplet } from '@/services/digitalOceanService';
import { useDiscount } from '@/hooks/useDiscount';
import { saveVpsOrder } from '@/services/supabaseService';
import StripePaymentForm from './StripePaymentForm';

const purchaseSchema = z.object({
  hostname: z.string().min(3, "Hostname must be at least 3 characters"),
  region: z.string().min(1, "Please select a region"),
  billing_cycle: z.enum(["1", "3", "6", "12"], {
    required_error: "Please select a billing cycle",
  }),
  plesk_panel: z.boolean().default(false),
  litespeed: z.boolean().default(false),
  extra_ipv4: z.boolean().default(false),
});

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

interface VPSPurchaseProps {
  selectedPackage: DigitalOceanSize;
  availableRegions: DigitalOceanRegion[];
  onPurchaseSuccess: (hostname: string, region: string) => void;
  isAnnual?: boolean;
  initialBillingCycle?: "1" | "3" | "6" | "12";
}

const VPSPurchase: React.FC<VPSPurchaseProps> = ({ 
  selectedPackage,
  availableRegions,
  onPurchaseSuccess,
  isAnnual = false,
  initialBillingCycle = "1"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formValues, setFormValues] = useState<PurchaseFormValues | null>(null);
  
  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      hostname: "",
      region: availableRegions.length > 0 ? availableRegions[0].slug : "",
      billing_cycle: initialBillingCycle,
      plesk_panel: false,
      litespeed: false,
      extra_ipv4: false,
    },
  });
  
  const billingCycle = form.watch("billing_cycle");
  const pleskPanel = form.watch("plesk_panel");
  const litespeed = form.watch("litespeed");
  const extraIpv4 = form.watch("extra_ipv4");
  
  const basePrice = selectedPackage.price_monthly || 0;
  const discountedPrice = useDiscount(selectedPackage, billingCycle);
  
  const pleskPrice = 5;
  const litespeedPrice = 10;
  const extraIpv4Price = 2;
  
  const addons = (pleskPanel ? pleskPrice : 0) + 
                 (litespeed ? litespeedPrice : 0) + 
                 (extraIpv4 ? extraIpv4Price : 0);
  
  const totalMonthlyPrice = discountedPrice + addons;
  const billingCycleMonths = parseInt(billingCycle);
  const totalPrice = totalMonthlyPrice * billingCycleMonths;
  
  const onProceedToPayment = (values: PurchaseFormValues) => {
    setFormValues(values);
    setShowPaymentForm(true);
  };
  
  const onPaymentSuccess = async () => {
    if (!formValues) return;
    
    setIsLoading(true);
    
    try {
      const result = await createDroplet(
        formValues.hostname, 
        formValues.region, 
        selectedPackage.slug
      );
      
      if (result) {
        await saveVpsOrder({
          packageName: selectedPackage.slug,
          datacenter: formValues.region,
          period: parseInt(formValues.billing_cycle),
          amount: Math.round(totalPrice * 100),
          config: {
            hostname: formValues.hostname,
            package: {
              vcpus: selectedPackage.vcpus,
              memory: selectedPackage.memory,
              disk: selectedPackage.disk
            },
            addons: {
              plesk: pleskPanel,
              litespeed: litespeed,
              extraIpv4: extraIpv4
            }
          },
          email: localStorage.getItem('current_user_email') || ''
        });
        
        toast({
          title: "Purchase Successful",
          description: "Your VPS is being provisioned and will be ready shortly.",
        });
        
        onPurchaseSuccess(
          formValues.hostname,
          formValues.region
        );
      } else {
        throw new Error("Failed to create VPS");
      }
    } catch (error) {
      console.error('Error creating VPS:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (showPaymentForm) {
    return (
      <StripePaymentForm 
        amount={totalPrice} 
        onSuccess={onPaymentSuccess}
        onCancel={() => setShowPaymentForm(false)}
        orderDetails={{
          package: selectedPackage.slug,
          hostname: formValues?.hostname || '',
          billingCycle: formValues?.billing_cycle || '1',
          amount: totalPrice,
          addons: {
            pleskPanel,
            litespeed,
            extraIpv4
          },
          vcpus: selectedPackage.vcpus,
          memory: selectedPackage.memory,
          disk: selectedPackage.disk
        }}
        isAnnual={isAnnual}
      />
    );
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure Your VPS</CardTitle>
        <CardDescription>
          Customize your {selectedPackage.slug.toUpperCase()} VPS
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onProceedToPayment)}>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">Package Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>CPU:</div>
                <div className="font-medium">{selectedPackage.vcpus} vCPUs</div>
                <div>Memory:</div>
                <div className="font-medium">{selectedPackage.memory / 1024} GB RAM</div>
                <div>Storage:</div>
                <div className="font-medium">{selectedPackage.disk} GB SSD</div>
                <div>Base Price:</div>
                <div className="font-medium">€{discountedPrice.toFixed(2)}/month</div>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="hostname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostname</FormLabel>
                  <FormControl>
                    <Input placeholder="my-vps-server" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a hostname for your VPS
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRegions.map((region) => (
                        <SelectItem key={region.slug} value={region.slug}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a region for your VPS
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <h3 className="font-medium">Add-ons</h3>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="plesk_panel" 
                    checked={pleskPanel}
                    onCheckedChange={(checked) => 
                      form.setValue('plesk_panel', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="plesk_panel"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Plesk Panel
                  </label>
                </div>
                <span className="text-sm">+€{pleskPrice}/month</span>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="litespeed" 
                    checked={litespeed}
                    onCheckedChange={(checked) => 
                      form.setValue('litespeed', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="litespeed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    LiteSpeed WebServer
                  </label>
                </div>
                <span className="text-sm">+€{litespeedPrice}/month</span>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="extra_ipv4" 
                    checked={extraIpv4}
                    onCheckedChange={(checked) => 
                      form.setValue('extra_ipv4', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="extra_ipv4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Extra IPv4 Address
                  </label>
                </div>
                <span className="text-sm">+€{extraIpv4Price}/month</span>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="billing_cycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Cycle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="3">3 Months (5% discount)</SelectItem>
                      <SelectItem value="6">6 Months (10% discount)</SelectItem>
                      <SelectItem value="12">12 Months (15% discount)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Longer terms get better discounts
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base plan:</span>
                  <span>€{discountedPrice.toFixed(2)}/month</span>
                </div>
                {pleskPanel && (
                  <div className="flex justify-between">
                    <span>Plesk Panel:</span>
                    <span>+€{pleskPrice.toFixed(2)}/month</span>
                  </div>
                )}
                {litespeed && (
                  <div className="flex justify-between">
                    <span>LiteSpeed:</span>
                    <span>+€{litespeedPrice.toFixed(2)}/month</span>
                  </div>
                )}
                {extraIpv4 && (
                  <div className="flex justify-between">
                    <span>Extra IPv4:</span>
                    <span>+€{extraIpv4Price.toFixed(2)}/month</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>Monthly Total:</span>
                  <span>€{totalMonthlyPrice.toFixed(2)}/month</span>
                </div>
                <div className="pt-2 border-t border-border mt-2 flex justify-between font-bold">
                  <span>Total ({billingCycleMonths} months):</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default VPSPurchase;
