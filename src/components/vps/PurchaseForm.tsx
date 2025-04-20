
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DigitalOceanSize, DigitalOceanRegion, createDroplet } from '@/services/digitalOceanService';
import { toast } from '@/hooks/use-toast';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomer, getCurrentCustomer, createLease } from '@/services/leasingService';
import { purchaseFormSchema, PurchaseFormValues } from './forms/FormSchema';
import SuccessMessage from './forms/SuccessMessage';
import PurchaseFormFields from './forms/PurchaseFormFields';
import { useDiscount } from '@/hooks/useDiscount';
import { saveVpsOrder } from '@/services/supabaseService';

interface PurchaseFormProps {
  selectedPackage: DigitalOceanSize;
  regions: DigitalOceanRegion[];
  onCancel: () => void;
  onComplete: () => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ 
  selectedPackage, 
  regions, 
  onCancel,
  onComplete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const availableRegions = regions.filter(region => region.available);

  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      hostname: "",
      region: availableRegions.length > 0 ? availableRegions[0].slug : "",
      email: "",
      name: "",
      duration: "1"
    },
  });

  // Apply discount based on duration
  const discountedPrice = useDiscount(selectedPackage, form.watch('duration'));

  const onSubmit = async (values: PurchaseFormValues) => {
    setIsLoading(true);
    try {
      // Local storage for client-side state
      let customer = getCurrentCustomer();
      if (!customer) {
        customer = createCustomer(values.name, values.email);
        localStorage.setItem('current_user_email', values.email);
      }
      
      // Create the droplet via Digital Ocean API
      const result = await createDroplet(
        values.hostname, 
        values.region, 
        selectedPackage.slug
      );
      
      if (result) {
        // Create a lease in our system (localStorage)
        createLease(
          customer.id,
          `do_droplet_${Date.now()}`, // In a real system, this would be the actual Droplet ID
          values.hostname,
          values.region,
          selectedPackage.slug,
          discountedPrice,
          parseInt(values.duration)
        );
        
        // Also save to Supabase for persistent storage
        await saveVpsOrder({
          packageName: selectedPackage.slug,
          datacenter: values.region,
          period: parseInt(values.duration),
          amount: Math.round(discountedPrice * 100), // Store in cents
          config: {
            hostname: values.hostname,
            package: {
              vcpus: selectedPackage.vcpus,
              memory: selectedPackage.memory,
              disk: selectedPackage.disk
            }
          },
          email: values.email
        });
        
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your VPS has been provisioned successfully.",
        });
        
        // After 2 seconds, call the onComplete callback
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: "Failed to create VPS. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error creating droplet:', error);
      toast({
        title: "Error",
        description: "Failed to create VPS. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return <SuccessMessage />;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Purchase</CardTitle>
        <CardDescription>
          Configure your new {selectedPackage.slug.toUpperCase()} VPS lease
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <PurchaseFormFields 
              form={form}
              availableRegions={availableRegions}
              discountedPrice={discountedPrice}
              selectedPackageSlug={selectedPackage.slug}
              selectedPackageSpecs={{
                vcpus: selectedPackage.vcpus,
                memory: selectedPackage.memory,
                disk: selectedPackage.disk
              }}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Complete Purchase'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PurchaseForm;
