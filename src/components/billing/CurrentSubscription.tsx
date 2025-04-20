
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface CurrentSubscriptionProps {
  onUpgradePlan: () => void;
  onAddPaymentMethod: () => void;
  onUpdateCard: () => void;
  onUpdateAddress: () => void;
}

const CurrentSubscription: React.FC<CurrentSubscriptionProps> = ({
  onUpgradePlan,
  onAddPaymentMethod,
  onUpdateCard,
  onUpdateAddress
}) => {
  const [subscription, setSubscription] = useState<{
    name: string;
    specs: Array<{label: string}>;
    price: number;
    nextBillingDate: Date;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setError(null);
        const userEmail = localStorage.getItem('current_user_email');
        if (!userEmail) {
          console.log('No user email found in localStorage');
          setIsLoading(false);
          return;
        }

        console.log('Fetching subscription for email:', userEmail);

        // First, check if user exists
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .maybeSingle();
        
        if (userError) {
          console.error('Error finding user:', userError);
          setError('Unable to find user data');
          setIsLoading(false);
          return;
        }
        
        // If user doesn't exist, create one
        let userId;
        if (!userData) {
          console.log('User not found, creating new user');
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
            setIsLoading(false);
            return;
          }
          
          userId = newUser.id;
          console.log('Created new user with ID:', userId);
        } else {
          userId = userData.id;
          console.log('Found existing user with ID:', userId);
        }

        // Fetch user's latest VPS order using the numeric ID
        const { data: orders, error } = await supabase
          .from('vps_orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching orders:', error);
          setError('Unable to fetch subscription data');
          setIsLoading(false);
          return;
        }

        if (orders && orders.length > 0) {
          console.log('Found order:', orders[0]);
          const latestOrder = orders[0];
          
          // Parse the config as JSON if it's a string
          let configObj;
          try {
            configObj = typeof latestOrder.config === 'string' 
              ? JSON.parse(latestOrder.config) 
              : latestOrder.config || {};
          } catch (e) {
            console.error('Error parsing config:', e);
            configObj = {};
          }
          
          const packageDetails = configObj?.package || {};
          
          setSubscription({
            name: latestOrder.package_name || 'Professional VPS',
            specs: [
              { label: `${packageDetails?.memory || 4}GB RAM` },
              { label: `${packageDetails?.vcpus || 2} vCPUs` },
              { label: `${packageDetails?.disk || 80}GB SSD` }
            ],
            price: latestOrder.amount || 0,
            nextBillingDate: new Date(new Date(latestOrder.created_at).setMonth(new Date(latestOrder.created_at).getMonth() + 1))
          });
        } else {
          console.log('No orders found for user ID:', userId);
        }
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError('Unable to fetch subscription information');
        toast({
          title: "Error",
          description: "Unable to fetch subscription information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [navigate, toast]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Card className="border-olive/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-teal">Current Subscription</CardTitle>
          <CardDescription>Loading subscription details...</CardDescription>
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
          <CardTitle className="text-teal">Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="bg-rust/10 text-rust border-rust/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}. Please try again later or contact support.
            </AlertDescription>
          </Alert>
          <Button 
            className="mt-4 bg-teal hover:bg-teal/80"
            onClick={onUpgradePlan}
          >
            Choose a Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-olive/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-teal">Current Subscription</CardTitle>
        <CardDescription>
          Your active service plan and billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {subscription ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-teal/10 rounded-lg">
            <div>
              <h3 className="text-xl font-bold text-teal">{subscription.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {subscription.specs.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="bg-olive text-white">{spec.label}</Badge>
                ))}
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Next billing date: <span className="font-semibold">{formatDate(subscription.nextBillingDate)}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal">${subscription.price.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <Button size="sm" className="mt-2 bg-rust hover:bg-rust/80" onClick={onUpgradePlan}>Upgrade Plan</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border border-olive/20 rounded-lg text-center">
            <p className="text-muted-foreground">No active subscription found</p>
            <Button size="sm" className="mt-4 bg-teal hover:bg-teal/80" onClick={onUpgradePlan}>
              Choose a Plan
            </Button>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium mb-4 text-teal">Payment Method</h3>
          <div className="p-4 border border-olive/20 rounded-lg text-center">
            <p className="text-muted-foreground">No payment method added yet</p>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={onAddPaymentMethod} className="border-olive hover:bg-olive/10">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4 text-teal">Billing Address</h3>
          <div className="p-4 border border-olive/20 rounded-lg text-center">
            <p className="text-muted-foreground">No billing address added yet</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 border-olive hover:bg-olive/10" 
            onClick={onUpdateAddress}
          >
            Add Address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentSubscription;
