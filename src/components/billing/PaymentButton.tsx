
import React, { useState } from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface PaymentButtonProps extends ButtonProps {
  amount: number;
  description: string;
  productName: string;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
  onSuccess?: () => void;
  onPaymentError?: (error: Error) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  description,
  productName,
  currency = "eur",
  customerEmail,
  customerName,
  metadata = {},
  onSuccess,
  onPaymentError,
  children,
  disabled,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      console.log("Initiating Stripe checkout for:", productName);
      
      // Get customer email from localStorage if not provided
      const email = customerEmail || localStorage.getItem('current_user_email');
      
      if (!email) {
        throw new Error("Customer email is required for payment");
      }
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          orderDetails: {
            amount: amount,
            productName: productName,
            description: description,
            currency: currency,
            customerEmail: email,
            customerName: customerName,
            metadata: {
              ...metadata,
              productType: 'service_payment',
            }
          }
        }
      });
      
      if (error) {
        console.error("Error invoking create-checkout function:", error);
        throw new Error(error.message || "Failed to create checkout session");
      }
      
      if (!data || !data.sessionUrl) {
        throw new Error("Invalid response from checkout service");
      }
      
      console.log("Redirecting to Stripe checkout:", data.sessionUrl);
      window.location.href = data.sessionUrl;
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        title: "Payment Error",
        description: "Could not initiate payment process. Please try again.",
        variant: "destructive"
      });
      
      if (onPaymentError) {
        onPaymentError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default PaymentButton;
