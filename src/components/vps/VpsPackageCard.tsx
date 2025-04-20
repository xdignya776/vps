import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DigitalOceanSize } from '@/services/digitalOceanService';
import { formatMemory, formatStorage, formatBandwidth } from '@/lib/utils';
import PurchaseButton from './PurchaseButton';
import { useDiscount } from '@/hooks/useDiscount';
import { Shield, Cpu, HardDrive, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VpsPackageCardProps {
  package: DigitalOceanSize;
  onSelect?: () => void;
  onPurchase?: () => void;
  isAnnual?: boolean;
  showDiscountedPrice?: boolean;
  billingCycle?: string;
  className?: string;
}

const VpsPackageCard: React.FC<VpsPackageCardProps> = ({ 
  package: pkg,
  onSelect,
  onPurchase,
  isAnnual = false,
  showDiscountedPrice = false,
  billingCycle = "1",
  className
}) => {
  const { slug, memory, disk, vcpus, transfer, price_monthly } = pkg;
  
  const discountedPrice = showDiscountedPrice ? useDiscount(pkg, billingCycle) : price_monthly;
  
  const formattedMemory = formatMemory(memory);
  
  const formattedStorage = formatStorage(disk);
  
  const formattedBandwidth = formatBandwidth(transfer);
  
  const getCategory = () => {
    const desc = pkg.description?.toLowerCase() || '';
    if (desc.includes('premium')) return { name: 'Premium', color: 'bg-gradient-to-r from-amber-400 to-amber-600' };
    if (desc.includes('cpu')) return { name: 'CPU-Optimized', color: 'bg-gradient-to-r from-blue-400 to-blue-600' };
    if (desc.includes('memory')) return { name: 'Memory-Optimized', color: 'bg-gradient-to-r from-purple-400 to-purple-600' };
    if (desc.includes('storage')) return { name: 'Storage-Optimized', color: 'bg-gradient-to-r from-green-400 to-green-600' };
    if (desc.includes('dedicated')) return { name: 'Dedicated', color: 'bg-gradient-to-r from-red-400 to-red-600' };
    return { name: 'Standard', color: 'bg-gradient-to-r from-slate-400 to-slate-600' };
  };
  
  const category = getCategory();
  
  return (
    <Card className={cn(
      "h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 border-border/50 bg-gradient-to-b from-card to-card/95 animate-fade-in",
      className
    )}>
      <CardHeader className="pb-2 relative">
        <Badge 
          variant="outline" 
          className={`${category.color} text-white font-medium border-0 shadow-sm absolute right-6 top-4 transform rotate-2`}
        >
          {category.name}
        </Badge>
        <div className="mb-6">
          <CardTitle className="text-2xl font-bold tracking-tight">{slug.toUpperCase()}</CardTitle>
          <CardDescription className="font-medium mt-1">
            {pkg.description || 'Virtual Private Server'}
          </CardDescription>
        </div>
        <div className="text-center mt-4 mb-2">
          <span className="text-4xl font-bold font-sans tracking-tight">€{discountedPrice}</span>
          <span className="text-muted-foreground ml-1 font-medium">/mo</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <Cpu className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div className="flex justify-between w-full">
              <span className="text-muted-foreground font-medium">CPU</span>
              <span className="font-semibold">{vcpus} vCPUs</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <Maximize2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <div className="flex justify-between w-full">
              <span className="text-muted-foreground font-medium">Memory</span>
              <span className="font-semibold">{formattedMemory}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <HardDrive className="h-5 w-5 text-green-500 flex-shrink-0" />
            <div className="flex justify-between w-full">
              <span className="text-muted-foreground font-medium">Storage</span>
              <span className="font-semibold">{formattedStorage} SSD</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <Shield className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <div className="flex justify-between w-full">
              <span className="text-muted-foreground font-medium">Bandwidth</span>
              <span className="font-semibold">{formattedBandwidth}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {onSelect ? (
          <button
            onClick={onSelect}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-primary-foreground py-3 rounded-md transition-all duration-200 font-medium shadow-sm"
          >
            Select Package
          </button>
        ) : onPurchase ? (
          <button
            onClick={onPurchase}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-primary-foreground py-3 rounded-md transition-all duration-200 font-medium shadow-sm"
          >
            Purchase Now
          </button>
        ) : (
          <PurchaseButton 
            packageSlug={slug} 
            className="w-full py-3 font-medium shadow-sm bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            package={pkg}
            isAnnual={isAnnual}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default VpsPackageCard;
