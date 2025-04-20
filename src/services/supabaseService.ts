
import { DashboardOrder, Customer, Json } from './types';
import { supabase } from "@/integrations/supabase/client";

interface VpsOrderInput {
  packageName: string;
  datacenter: string;
  period: number;
  amount: number;
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
  email: string;
}

export const saveVpsOrder = async (order: VpsOrderInput) => {
  try {
    // First, find user by email or create a new user
    let userId;
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', order.email)
      .maybeSingle();

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create a new user if not found
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: order.email,
          username: order.email.split('@')[0],  // Use part of email as username
          password: 'temporary',  // This should be properly handled with auth
        })
        .select('id')
        .single();

      if (userError || !newUser) {
        console.error('Error creating user:', userError);
        return null;
      }
      
      userId = newUser.id;
    }

    // Then create the VPS order with user_id
    const { data, error } = await supabase
      .from('vps_orders')
      .insert({
        user_id: userId,
        package_name: order.packageName,
        datacenter: order.datacenter,
        period: order.period,
        amount: order.amount,
        config: order.config as Json,
        status: 'active',
        droplet_id: `droplet_${Date.now()}`
      })
      .select();

    if (error) {
      console.error('Error saving VPS order:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error saving VPS order:', error);
    return null;
  }
};

export const fetchVpsOrders = async (): Promise<DashboardOrder[]> => {
  try {
    const { data, error } = await supabase
      .from('vps_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching VPS orders:', error);
      return [];
    }

    // Properly convert Supabase data to DashboardOrder type with explicit casting
    return data.map(order => {
      // Ensure the config is properly typed
      const typedConfig = typeof order.config === 'string' 
        ? JSON.parse(order.config) 
        : order.config;

      return {
        id: order.id,
        user_id: order.user_id,
        package_name: order.package_name,
        datacenter: order.datacenter,
        period: order.period,
        amount: order.amount,
        status: order.status,
        created_at: order.created_at,
        stripe_payment_intent_id: order.stripe_payment_intent_id,
        droplet_id: order.droplet_id,
        config: typedConfig as DashboardOrder['config']
      };
    });
  } catch (error) {
    console.error('Error fetching VPS orders:', error);
    return [];
  }
};

/**
 * Fetch VPS orders by user email
 * @param email User email to filter orders by
 * @returns Array of DashboardOrder objects
 */
export const getVpsOrdersByEmail = async (email: string): Promise<DashboardOrder[]> => {
  try {
    // First, try to find the user by email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (userError || !userData) {
      console.error('Error finding user:', userError);
      return [];
    }

    // Then fetch orders for that user
    const { data, error } = await supabase
      .from('vps_orders')
      .select('*')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching VPS orders by email:', error);
      return [];
    }

    // Properly convert Supabase data to DashboardOrder type
    return data.map(order => {
      // Ensure the config is properly typed
      const typedConfig = typeof order.config === 'string' 
        ? JSON.parse(order.config) 
        : order.config;

      return {
        id: order.id,
        user_id: order.user_id,
        package_name: order.package_name,
        datacenter: order.datacenter,
        period: order.period,
        amount: order.amount,
        status: order.status,
        created_at: order.created_at,
        stripe_payment_intent_id: order.stripe_payment_intent_id,
        droplet_id: order.droplet_id,
        config: typedConfig as DashboardOrder['config']
      };
    });
  } catch (error) {
    console.error('Error fetching VPS orders by email:', error);
    return [];
  }
};

// Get VPS order by ID
export const getVpsOrderById = async (id: number): Promise<DashboardOrder | null> => {
  try {
    const { data, error } = await supabase
      .from('vps_orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    // Fix the type issue by explicitly casting the config field
    const typedConfig = typeof data.config === 'string' 
      ? JSON.parse(data.config) 
      : data.config;
    
    const orderWithStatus: DashboardOrder = {
      id: data.id,
      user_id: data.user_id,
      package_name: data.package_name,
      datacenter: data.datacenter,
      period: data.period,
      amount: data.amount,
      status: data.status || 'active',
      created_at: data.created_at,
      stripe_payment_intent_id: data.stripe_payment_intent_id,
      droplet_id: data.droplet_id,
      config: typedConfig as DashboardOrder['config']
    };
    
    return orderWithStatus;
  } catch (error) {
    console.error('Error fetching VPS order by ID:', error);
    return null;
  }
};

// New function to save customer data
export const saveCustomer = async (name: string, email: string): Promise<Customer | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        username: name,
        email: email,
        password: 'temporary' // This should be properly handled with auth
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving customer:', error);
      return null;
    }

    // Create a Customer object from the user data
    return {
      id: data.id.toString(),
      name: data.username,
      email: data.email,
      created_at: data.created_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error saving customer:', error);
    return null;
  }
};
