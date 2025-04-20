
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const BillingSummary = () => {
  const [billingData, setBillingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userEmail = localStorage.getItem('current_user_email');
        
        if (!userEmail) {
          // Handle missing user case silently
          console.log('No user found in localStorage');
          setIsLoading(false);
          return;
        }

        // Fetch billing data from Supabase - use maybeSingle instead of single
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .maybeSingle(); // This won't throw an error if no user is found
        
        if (userError) {
          console.error('Error fetching user:', userError);
          setError('Unable to fetch user data');
          return;
        }
        
        if (!userData) {
          console.log('User not found');
          setBillingData(null);
          setIsLoading(false);
          return;
        }
        
        // Now fetch orders using the user's numeric ID
        const { data, error } = await supabase
          .from('vps_orders')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          setBillingData(data[0]);
        } else {
          setBillingData(null);
        }
      } catch (error) {
        console.error('Error fetching billing data:', error);
        setError('Unable to fetch billing information');
        toast({
          title: "Error",
          description: "Unable to fetch billing information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingData();
  }, [navigate, toast]);

  const handleMakePayment = () => {
    navigate('/billing');
  };

  if (isLoading) {
    return (
      <Card className="border-olive/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-teal">Billing Summary</CardTitle>
          <CardDescription>Loading billing details...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-olive/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-teal">Billing Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="bg-rust/10 text-rust border-rust/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}. Please try again later or contact support.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-olive/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-teal">Billing Summary</CardTitle>
        <CardDescription>
          Overview of your current billing status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <p className="text-lg font-medium text-olive">{billingData?.package_name || 'No active plan'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Cost</p>
            <p className="text-lg font-medium text-olive">${billingData?.amount?.toFixed(2) || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Payment</p>
            <p className="text-lg font-medium text-olive">
              {billingData ? new Date(new Date(billingData.created_at).setMonth(
                new Date(billingData.created_at).getMonth() + 1
              )).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Payment Status</p>
            <p className="text-lg font-medium text-olive">{billingData ? 'Paid' : 'N/A'}</p>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button 
            onClick={handleMakePayment}
            disabled={!billingData}
            className="bg-teal hover:bg-teal/80"
          >
            Make Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSummary;
