
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderDetails {
  amount: number;
  productName: string;
  description: string;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
}

interface RequestBody {
  orderDetails: OrderDetails;
  isAnnual?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const body: RequestBody = await req.json();
    const { orderDetails, isAnnual } = body;
    console.log('Order details received:', orderDetails);
    
    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('Missing Stripe secret key');
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });
    
    // Calculate total amount in cents for Stripe
    const amount = Math.round(orderDetails.amount * 100);
    
    // Determine product name and description
    const productName = orderDetails.productName || 'Service Payment';
    const description = orderDetails.description || 'Payment for services';
    const currency = orderDetails.currency || 'eur';
    
    // Find or create customer in Stripe
    let customerId: string | undefined;
    if (orderDetails.customerEmail) {
      // Check if customer already exists
      const customers = await stripe.customers.list({
        email: orderDetails.customerEmail,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log(`Using existing customer: ${customerId}`);
      } else {
        // Create new customer
        const newCustomer = await stripe.customers.create({
          email: orderDetails.customerEmail,
          name: orderDetails.customerName,
          metadata: orderDetails.metadata,
        });
        
        customerId = newCustomer.id;
        console.log(`Created new customer: ${customerId}`);
      }
    }
    
    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
              description: description,
              metadata: orderDetails.metadata,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // One-time payment
      success_url: `${req.headers.get('origin')}/billing?success=true`,
      cancel_url: `${req.headers.get('origin')}/billing?canceled=true`,
      customer: customerId,
      customer_email: !customerId ? orderDetails.customerEmail : undefined,
      billing_address_collection: 'required', // Collect billing address
      metadata: {
        productName,
        isAnnual: isAnnual ? 'true' : 'false',
        ...orderDetails.metadata,
      }
    });
    
    console.log('Stripe checkout session created:', session.id);
    
    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        sessionUrl: session.url
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
