
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { toast } from '@/hooks/use-toast';
import { getLeasesByCustomerId, getBillingCyclesByLeaseId } from "@/services/leasingService";
import { saveCustomer } from '@/services/supabaseService';
import PaymentMethodForm from '@/components/billing/PaymentMethodForm';
import PaymentSuccess from '@/components/billing/PaymentSuccess';
import UsageSummary from '@/components/billing/UsageSummary';
import BillingHeader from '@/components/billing/BillingHeader';
import { supabase } from "@/integrations/supabase/client";
import CurrentSubscription from '@/components/billing/CurrentSubscription';
import { BillingCycle } from '@/services/types';
import BillingTabs from '@/components/billing/BillingTabs';

interface PaymentMethod {
  cardNumber?: string;
  expiryDate?: string;
  cardType?: string;
  lastFour?: string;
  cardHolder?: string;
  billingAddress?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

const Billing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';
  
  const [showFullCard, setShowFullCard] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [updateCardModalOpen, setUpdateCardModalOpen] = useState(false);
  const [updateAddressModalOpen, setUpdateAddressModalOpen] = useState(false);
  const [leases, setLeases] = useState([]);
  const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedPaymentMethod = localStorage.getItem('payment_method');
    if (savedPaymentMethod) {
      setPaymentMethod(JSON.parse(savedPaymentMethod));
    }
    
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const email = localStorage.getItem('current_user_email');
        if (!email) {
          console.log('No user email found in localStorage');
          navigate('/login');
          return;
        }
        
        setUserEmail(email);
        console.log('Loading data for user email:', email);
        
        // Check if the user exists in the database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        
        if (userError) {
          console.error('Error fetching user data:', userError);
          setError('Error loading user data. Please try again later or contact support.');
          setIsLoading(false);
          return;
        }

        // If user doesn't exist, create a new one
        let userId;
        if (!userData) {
          console.log('User not found, creating new user');
          try {
            // Create user in users table
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert({
                email: email,
                username: email.split('@')[0],
                password: 'temporary_' + Math.random().toString(36).substring(2, 15)
              })
              .select('*')
              .single();
              
            if (createError) {
              console.error('Error creating user:', createError);
              setError('Failed to create user account. Please try again later.');
              setIsLoading(false);
              return;
            }
            
            console.log('Created new user:', newUser);
            userId = newUser.id;
            
            // Also save user as a customer
            await saveCustomer(newUser.username, email);
          } catch (err) {
            console.error('Error creating user or customer:', err);
            setError('Failed to create user account. Please try again later.');
            setIsLoading(false);
            return;
          }
        } else {
          console.log('Found existing user:', userData);
          userId = userData.id;
          
          if (userData.stripe_subscription_id) {
            setCurrentSubscription({
              name: "Professional VPS",
              specs: [
                { label: "4GB RAM" },
                { label: "2 vCPUs" },
                { label: "80GB SSD" }
              ],
              price: 20.00,
              nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            });
          }
        }
        
        // Get user leases
        try {
          const userLeases = await getLeasesByCustomerId(userId.toString());
          setLeases(userLeases || []);
          
          if (userLeases && userLeases.length > 0) {
            const cycles = await getBillingCyclesByLeaseId(userLeases[0].id);
            
            const formattedCycles = cycles?.map(cycle => ({
              ...cycle,
              date: cycle.due_date
            })) || [];
            
            setBillingCycles(formattedCycles);
          }
        } catch (err) {
          console.error('Error fetching leases or billing cycles:', err);
          // Don't set an error here, just log it, as this isn't critical
        }
      } catch (error) {
        console.error('Failed to load billing data:', error);
        setError('Error loading billing data. Please try again later or contact support.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();

    if (success) {
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
        variant: "default"
      });
    } else if (canceled) {
      toast({
        title: "Payment Canceled",
        description: "You've canceled the payment process.",
        variant: "default"
      });
    }
  }, [navigate, success, canceled]);
  
  const handleUpgradePlan = () => {
    toast({
      title: "Going to VPS selection",
      description: "Redirecting you to choose a VPS package"
    });
    navigate('/vps');
  };
  
  const handleAddPaymentMethod = () => {
    setPaymentModalOpen(true);
  };
  
  const handleUpdateCard = () => {
    setUpdateCardModalOpen(true);
  };
  
  const handleUpdateAddress = () => {
    setUpdateAddressModalOpen(true);
  };
  
  const handleMakePayment = () => {
    toast({
      title: "Payment Processing",
      description: "Redirecting to payment processor..."
    });
  };
  
  const handlePaymentMethodSuccess = (data: PaymentMethod) => {
    setPaymentMethod(data);
    localStorage.setItem('payment_method', JSON.stringify(data));
    toast({
      title: "Payment Method Updated",
      description: "Your payment method has been successfully updated."
    });
  };
  
  const handleAddressUpdateSuccess = (addressData: any) => {
    if (paymentMethod) {
      const updatedPaymentMethod = {
        ...paymentMethod,
        billingAddress: addressData
      };
      
      setPaymentMethod(updatedPaymentMethod);
      localStorage.setItem('payment_method', JSON.stringify(updatedPaymentMethod));
      
      toast({
        title: "Billing Address Updated",
        description: "Your billing address has been successfully updated."
      });
    } else {
      setPaymentMethod({
        billingAddress: addressData
      });
      localStorage.setItem('payment_method', JSON.stringify({
        billingAddress: addressData
      }));
      
      toast({
        title: "Billing Address Added",
        description: "Your billing address has been successfully added."
      });
    }
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceId} download started.`
    });
  };
  
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getDaysUntil = (targetDate: Date | string): number => {
    const currentDate = new Date();
    const dateToUse = targetDate instanceof Date ? targetDate : new Date(targetDate);
    if (isNaN(dateToUse.getTime())) {
      console.error('Invalid date provided to getDaysUntil:', targetDate);
      return 0;
    }
    const timeDiff = dateToUse.getTime() - currentDate.getTime();
    return Math.round(timeDiff / (1000 * 60 * 60 * 24));
  };

  if (success || canceled) {
    return <PaymentSuccess />;
  }
  
  const hasPaymentMethod = !!paymentMethod;
  
  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BillingHeader 
          onGenerateReports={() => {
            toast({
              title: "Reports Generated",
              description: "Your billing reports are being generated and will be emailed to you."
            });
          }}
        />
        
        {error && (
          <Alert variant="destructive" className="mb-6 bg-rust/10 text-rust border-rust/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading billing information...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <CurrentSubscription 
                onUpgradePlan={handleUpgradePlan}
                onAddPaymentMethod={handleAddPaymentMethod}
                onUpdateCard={handleUpdateCard}
                onUpdateAddress={handleUpdateAddress}
              />
            </div>
            
            <div>
              <UsageSummary
                onMakePayment={handleMakePayment}
                onAddService={() => navigate('/vps')}
                customerEmail={userEmail || undefined}
                customerName={paymentMethod?.cardHolder || undefined}
                paymentMethod={paymentMethod || undefined}
              />
              
              {currentSubscription && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your next payment is due in {getDaysUntil(currentSubscription.nextBillingDate)} days.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )}
        
        {!isLoading && !error && (
          <BillingTabs
            billingCycles={billingCycles}
            formatDate={formatDate}
            handleDownloadInvoice={handleDownloadInvoice}
            navigateToVps={() => navigate('/vps')}
          />
        )}
      </div>
      
      <PaymentMethodForm 
        isOpen={paymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)} 
        isUpdate={false}
        onSuccess={handlePaymentMethodSuccess}
      />
      
      <PaymentMethodForm 
        isOpen={updateCardModalOpen} 
        onClose={() => setUpdateCardModalOpen(false)} 
        isUpdate={true}
        onSuccess={handlePaymentMethodSuccess}
      />
      
      <PaymentMethodForm 
        isOpen={updateAddressModalOpen} 
        onClose={() => setUpdateAddressModalOpen(false)} 
        isUpdate={true}
        isAddressOnly={true}
        onSuccess={handleAddressUpdateSuccess}
      />
    </>
  );
};

export default Billing;
