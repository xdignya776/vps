
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { DigitalOceanSize } from '@/services/digitalOceanService';

interface PackageSummaryProps {
  selectedPackage: DigitalOceanSize;
  discountedPrice: number;
}

const PackageSummary: React.FC<PackageSummaryProps> = ({ 
  selectedPackage, 
  discountedPrice 
}) => {
  return (
    <div className="mb-4 p-4 bg-muted rounded-md">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">Package:</span>
        <span className="font-medium">{selectedPackage.slug.toUpperCase()}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">Monthly Price:</span>
        <span className="font-medium">€{discountedPrice}/month</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Specs:</span>
        <span className="font-medium">
          {selectedPackage.vcpus} vCPUs, {selectedPackage.memory} MB RAM, {selectedPackage.disk} GB SSD
        </span>
      </div>
    </div>
  );
};

export default PackageSummary;
