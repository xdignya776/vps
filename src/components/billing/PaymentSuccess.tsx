
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  useEffect(() => {
    if (success) {
      // You could potentially fetch order details here
      console.log('Payment successful');
    }
    if (canceled) {
      console.log('Payment canceled');
    }
  }, [success, canceled]);

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          {success ? (
            <>
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            </>
          ) : canceled ? (
            <>
              <CardTitle className="text-2xl">Payment Canceled</CardTitle>
              <p className="text-muted-foreground">Your payment was not completed.</p>
            </>
          ) : (
            <CardTitle className="text-2xl">Payment Status</CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {success && (
            <p className="text-center text-muted-foreground">
              Thank you for your payment. Your transaction has been completed and a receipt has been emailed to you.
            </p>
          )}
          {canceled && (
            <p className="text-center text-muted-foreground">
              You've canceled the payment process. If you experienced any issues, please try again or contact our support team.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => navigate('/billing')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Billing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
