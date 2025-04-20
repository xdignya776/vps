
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface OrderDetails {
  package: string;
  hostname: string;
  billingCycle: string;
  amount: number;
  addons: {
    pleskPanel: boolean;
    litespeed: boolean;
    extraIpv4: boolean;
  };
  // Add these properties for Stripe product creation
  vcpus?: number;
  memory?: number;
  disk?: number;
}

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  orderDetails: OrderDetails;
  isAnnual: boolean;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  onSuccess,
  onCancel,
  orderDetails,
  isAnnual
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const initiateCheckout = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      
      try {
        console.log("Initiating Stripe checkout with order details:", orderDetails);
        
        const { data, error } = await supabase.functions.invoke('create-checkout', {
          body: { 
            orderDetails: {
              ...orderDetails,
              // Make sure to pass the numeric amount
              amount: amount,
            }, 
            isAnnual 
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
        
      } catch (error) {
        console.error("Payment initiation error:", error);
        setErrorMessage(error.message || "Failed to initiate payment");
        toast({
          title: "Payment Error",
          description: "Could not initiate payment process. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    initiateCheckout();
  }, []);
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Processing Your Payment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        {isLoading && !errorMessage && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-center text-muted-foreground">
              Redirecting to secure payment page, please wait...
            </p>
          </>
        )}
        
        {errorMessage && (
          <div className="text-center">
            <p className="text-destructive mb-4">{errorMessage}</p>
            <p className="text-muted-foreground mb-6">
              There was a problem setting up your payment. Please try again.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={onCancel} disabled={isLoading && !errorMessage}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StripePaymentForm;
