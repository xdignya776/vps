
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from 'lucide-react';
import PaymentButton from './PaymentButton';
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface UsageSummaryProps {
  onMakePayment?: () => void;
  onAddService: () => void;
  customerEmail?: string;
  customerName?: string;
  paymentMethod?: any;
}

const UsageSummary: React.FC<UsageSummaryProps> = ({
  onMakePayment,
  onAddService,
  customerEmail,
  customerName,
  paymentMethod
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const userEmail = customerEmail || localStorage.getItem('current_user_email');
        
        if (!userEmail) {
          console.log('No user email found in localStorage or props');
          setError('No user email found');
          setLoading(false);
          return;
        }

        console.log('Fetching orders for email:', userEmail);

        // First, check if the user exists in the database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .maybeSingle();
        
        if (userError) {
          console.error('Error finding user:', userError);
          setError('Failed to find user account');
          setLoading(false);
          return;
        }

        // If user doesn't exist, create one
        let userId;
        if (!userData) {
          console.log('User not found, creating new user with email:', userEmail);
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert({
              email: userEmail,
              username: userEmail.split('@')[0],
              password: 'temporary_' + Math.random().toString(36).substring(2, 15)
            })
            .select('id')
            .single();
            
          if (createError) {
            console.error('Error creating user:', createError);
            setError('Failed to create user account');
            setLoading(false);
            return;
          }
          
          userId = newUser.id;
          console.log('Created new user with ID:', userId);
        } else {
          userId = userData.id;
          console.log('Found existing user with ID:', userId);
        }

        // Then get their latest order
        const { data: orders, error: orderError } = await supabase
          .from('vps_orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (orderError) {
          console.error('Error fetching orders:', orderError);
          setError('Failed to load billing data');
          setLoading(false);
          return;
        }

        if (orders) {
          console.log('Found order:', orders);
          setOrderData(orders);
        } else {
          console.log('No orders found for user ID:', userId);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching billing data:', err);
        setError('Failed to load billing data');
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [customerEmail]);

  if (loading) {
    return (
      <Card className="border-olive/20 shadow-md">
        <CardContent className="space-y-4 p-6">
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-olive/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-teal">Usage Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <Alert variant="destructive" className="bg-rust/10 text-rust border-rust/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button 
            variant="outline" 
            className="w-full border-olive hover:bg-olive/10" 
            onClick={onAddService}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!orderData) {
    return (
      <Card className="border-olive/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-teal">Usage Summary</CardTitle>
          <CardDescription>No active services found</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full border-olive hover:bg-olive/10" 
            onClick={onAddService}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </CardContent>
      </Card>
    );
  }

  const tax = orderData.amount * 0.08; // 8% tax rate
  const total = orderData.amount + tax;

  return (
    <Card className="border-olive/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-teal">Usage Summary</CardTitle>
        <CardDescription>
          Current billing cycle usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{orderData.package_name}</span>
            <span className="text-olive">${orderData.amount.toFixed(2)}</span>
          </div>
          
          <Separator className="my-2 bg-olive/20" />
          
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span className="text-olive">${orderData.amount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span className="text-olive">${tax.toFixed(2)}</span>
          </div>
          
          <Separator className="my-2 bg-olive/20" />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-teal">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="pt-4">
          <PaymentButton
            className="w-full bg-teal hover:bg-teal/80"
            amount={total}
            productName={orderData.package_name}
            description={`Payment for ${orderData.package_name}`}
            customerEmail={customerEmail}
            customerName={customerName}
            metadata={{
              paymentType: 'service_fees',
              billingCycle: 'monthly',
              orderId: orderData.id
            }}
            onClick={onMakePayment}
          >
            Make Payment
          </PaymentButton>
        </div>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            className="w-full border-olive hover:bg-olive/10" 
            onClick={onAddService}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageSummary;
