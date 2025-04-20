
import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DigitalOceanRegion } from '@/services/digitalOceanService';
import { UseFormReturn } from 'react-hook-form';
import { PurchaseFormValues } from './FormSchema';
import PackageSummary from './PackageSummary';

interface PurchaseFormFieldsProps {
  form: UseFormReturn<PurchaseFormValues>;
  availableRegions: DigitalOceanRegion[];
  discountedPrice: number;
  selectedPackageSlug: string;
  selectedPackageSpecs: {
    vcpus: number;
    memory: number;
    disk: number;
  };
}

const PurchaseFormFields: React.FC<PurchaseFormFieldsProps> = ({
  form,
  availableRegions,
  discountedPrice,
  selectedPackageSlug,
  selectedPackageSpecs
}) => {
  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <PackageSummary 
          selectedPackage={{
            slug: selectedPackageSlug,
            vcpus: selectedPackageSpecs.vcpus,
            memory: selectedPackageSpecs.memory,
            disk: selectedPackageSpecs.disk,
            transfer: 0,
            price_monthly: 0,
            price_hourly: 0,
            regions: [],
            available: true,
            description: ""
          }} 
          discountedPrice={discountedPrice} 
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll send VPS details to this email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lease Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lease duration" />
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
      </div>
    </div>
  );
};

export default PurchaseFormFields;
