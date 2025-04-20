
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PaymentButton from './PaymentButton';

interface BillingHeaderProps {
  onGenerateReports: () => void;
  showPaymentButton?: boolean;
}

const BillingHeader: React.FC<BillingHeaderProps> = ({ 
  onGenerateReports,
  showPaymentButton = false 
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Billing & Payments</h1>
      <div className="flex gap-2">
        {showPaymentButton && (
          <PaymentButton 
            amount={20.00}
            productName="Premium Plan"
            description="Monthly subscription to premium services"
            variant="default"
            onSuccess={() => {
              toast({
                title: "Payment Initiated",
                description: "You will be redirected to the secure payment page."
              });
            }}
          >
            Make Payment
          </PaymentButton>
        )}
        <Button variant="outline" className="flex items-center" onClick={onGenerateReports}>
          <Download className="h-4 w-4 mr-2" />
          Billing Reports
        </Button>
      </div>
    </div>
  );
};

export default BillingHeader;
