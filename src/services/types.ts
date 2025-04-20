
// Types for leasing system
export interface Customer {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface VpsLease {
  id: string;
  customer_id: string;
  instance_id: string;
  hostname: string;
  region: string;
  size_slug: string;
  monthly_price: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface BillingCycle {
  id: string;
  lease_id: string;
  amount: number;
  due_date: string;
  paid_date: string | null;
  status: 'pending' | 'paid' | 'overdue';
}

// Types for Dashboard
export interface DashboardOrder {
  id: number;
  user_id: number;
  package_name: string;
  datacenter: string;
  period: number;
  amount: number;
  status: string;
  created_at: string;
  stripe_payment_intent_id: string | null;
  droplet_id: string | null;
  config: {
    hostname: string;
    package: {
      vcpus: number;
      memory: number;
      disk: number;
    };
    addons?: {
      plesk?: boolean;
      litespeed?: boolean;
      extraIpv4?: boolean;
    };
  };
}

// Types for Stripe integration
export interface StripePaymentIntent {
  id: string;
  amount: number;
  client_secret: string;
  currency: string;
  status: string;
}

export interface StripeCustomer {
  id: string;
  email: string;
  name: string | null;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
}

// Type for handling JSON data from Supabase
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
