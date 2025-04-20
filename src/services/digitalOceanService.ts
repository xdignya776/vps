import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Types for Digital Ocean resources
export interface DigitalOceanSize {
  slug: string;
  memory: number;
  vcpus: number;
  disk: number;
  transfer: number;
  price_monthly: number;
  price_hourly: number;
  regions: string[];
  available: boolean;
  description: string;
}

export interface DigitalOceanRegion {
  slug: string;
  name: string;
  available: boolean;
}

// Function to fetch available sizes (VPS packages)
export const fetchSizes = async (): Promise<DigitalOceanSize[]> => {
  try {
    console.log('Fetching Digital Ocean sizes...');
    const { data, error } = await supabase.functions.invoke('digital-ocean/sizes', {
      method: 'POST' // Using POST method with our edge function
    });

    if (error) {
      console.error('Error invoking digital-ocean function:', error);
      throw error;
    }

    if (!data || !data.sizes) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    // Log retrieved data
    console.log('Retrieved sizes data:', data.sizes);

    // Add category information based on package characteristics
    return data.sizes.map((size: any) => ({
      slug: size.slug,
      memory: size.memory,
      vcpus: size.vcpus,
      disk: size.disk,
      transfer: size.transfer,
      price_monthly: size.price_monthly,
      price_hourly: size.price_hourly,
      regions: size.regions,
      available: size.available,
      description: determinePackageDescription(size)
    }));
  } catch (error) {
    console.error('Error fetching Digital Ocean sizes:', error);
    toast({
      title: "Error",
      description: "Failed to fetch VPS packages. Please try again later.",
      variant: "destructive"
    });
    
    // Return an empty array on error
    return [];
  }
};

// Helper function to determine package description based on specs
function determinePackageDescription(size: any): string {
  if (size.slug.includes('premium')) {
    return 'Premium';
  } else if (size.slug.includes('cpu-optimized') || size.slug.startsWith('c-')) {
    return 'CPU-Optimized';
  } else if (size.slug.includes('memory-optimized') || size.slug.startsWith('m-')) {
    return 'Memory-Optimized';
  } else if (size.slug.includes('storage-optimized') || size.slug.startsWith('so-')) {
    return 'Storage-Optimized';
  } else if (size.slug.includes('dedicated') || size.slug.startsWith('d-')) {
    return 'Dedicated';
  } else {
    return 'Standard';
  }
}

// Function to fetch available regions
export const fetchRegions = async (): Promise<DigitalOceanRegion[]> => {
  try {
    console.log('Fetching Digital Ocean regions...');
    const { data, error } = await supabase.functions.invoke('digital-ocean/regions', {
      method: 'POST' // Using POST method with our edge function
    });

    if (error) {
      console.error('Error invoking digital-ocean function:', error);
      throw error;
    }

    if (!data || !data.regions) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    // Log retrieved data
    console.log('Retrieved regions data:', data.regions);

    return data.regions.map((region: any) => ({
      slug: region.slug,
      name: region.name,
      available: region.available
    }));
  } catch (error) {
    console.error('Error fetching Digital Ocean regions:', error);
    toast({
      title: "Error",
      description: "Failed to fetch regions. Please try again later.",
      variant: "destructive"
    });
    
    // Return an empty array on error
    return [];
  }
};

// Function for creating a droplet
export const createDroplet = async (
  name: string, 
  region: string, 
  size: string
): Promise<boolean> => {
  try {
    console.log(`Creating droplet with name: ${name}, region: ${region}, size: ${size}`);
    
    const { data, error } = await supabase.functions.invoke('digital-ocean/droplets', {
      method: 'POST',
      body: {
        name,
        region,
        size,
        image: 'ubuntu-20-04-x64', // Default Ubuntu image
        backups: false,
        ipv6: true,
        private_networking: true,
        monitoring: true
      }
    });

    if (error) {
      console.error('Error invoking digital-ocean function:', error);
      throw error;
    }

    console.log('Droplet created successfully:', data);
    return true;
  } catch (error) {
    console.error('Error creating droplet:', error);
    toast({
      title: "Error",
      description: "Failed to create VPS. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};

// Helper functions for API key management (kept for backward compatibility)
const API_KEY_STORAGE_KEY = 'digitalocean_api_key';

export const setApiKey = (key: string) => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
  return key;
};

export const getApiKey = async (): Promise<string | null> => {
  try {
    console.log('Fetching API key from Supabase secrets...');

    // Fetch the primary API key from Supabase secrets
    const { data: primaryKey, error: primaryError } = await supabase.functions.invoke('get-secret', {
      method: 'POST',
      body: { key: 'DIGITALOCEAN_API_KEY' },
    });

    if (primaryError || !primaryKey) {
      console.error('Primary API key fetch failed:', primaryError);

      // Attempt to fetch the secondary API key if the primary fails
      const { data: secondaryKey, error: secondaryError } = await supabase.functions.invoke('get-secret', {
        method: 'POST',
        body: { key: 'DIGITALOCEAN_API_KEY1' },
      });

      if (secondaryError || !secondaryKey) {
        console.error('Secondary API key fetch failed:', secondaryError);
        return null; // Return null if both keys fail
      }

      console.log('Using secondary API key');
      return secondaryKey;
    }

    console.log('Using primary API key');
    return primaryKey;
  } catch (error) {
    console.error('Error fetching API key from Supabase secrets:', error);
    return null;
  }
};

export const hasApiKey = async (): Promise<boolean> => {
  const apiKey = await getApiKey();
  return !!apiKey; // Return true if an API key is successfully fetched
};

// Validation function for API keys (not used anymore but kept for compatibility)
export const validateApiKey = async (key: string): Promise<boolean> => {
  try {
    console.log('Validating API key...');
    const { data, error } = await supabase.functions.invoke('digital-ocean/validate', {
      method: 'GET',
      headers: {
        'x-do-api-key': key
      }
    });

    if (error) {
      console.error('Error validating API key:', error);
      return false;
    }

    console.log('API key validation result:', data);
    return data && data.account && !data.message;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};
