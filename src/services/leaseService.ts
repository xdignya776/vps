
import { VpsLease } from './types';
import { createBillingCycles } from './billingService';

// Lease functions
export const createLease = (
  customerId: string,
  instanceId: string,
  hostname: string,
  region: string,
  sizeSlug: string,
  monthlyPrice: number,
  durationMonths: number
): VpsLease => {
  const leases = JSON.parse(localStorage.getItem('vps_leases') || '[]');
  
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + durationMonths);
  
  const newLease: VpsLease = {
    id: `lease_${Date.now()}`,
    customer_id: customerId,
    instance_id: instanceId,
    hostname,
    region,
    size_slug: sizeSlug,
    monthly_price: monthlyPrice,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    status: 'active'
  };
  
  leases.push(newLease);
  localStorage.setItem('vps_leases', JSON.stringify(leases));
  
  // Create billing cycles for the duration
  createBillingCycles(newLease.id, monthlyPrice, durationMonths);
  
  return newLease;
};

export const getLeasesByCustomerId = (customerId: string): VpsLease[] => {
  const leases = JSON.parse(localStorage.getItem('vps_leases') || '[]');
  return leases.filter((lease: VpsLease) => lease.customer_id === customerId);
};

export const getLeaseById = (leaseId: string): VpsLease | null => {
  const leases = JSON.parse(localStorage.getItem('vps_leases') || '[]');
  return leases.find((lease: VpsLease) => lease.id === leaseId) || null;
};

export const updateLeaseStatus = (leaseId: string, status: 'active' | 'expired' | 'cancelled'): void => {
  const leases = JSON.parse(localStorage.getItem('vps_leases') || '[]');
  const updatedLeases = leases.map((lease: VpsLease) => {
    if (lease.id === leaseId) {
      return { ...lease, status };
    }
    return lease;
  });
  
  localStorage.setItem('vps_leases', JSON.stringify(updatedLeases));
};

// Mock function to simulate checking lease expirations
export const checkLeaseExpirations = (): void => {
  const leases = JSON.parse(localStorage.getItem('vps_leases') || '[]');
  const now = new Date();
  
  const updatedLeases = leases.map((lease: VpsLease) => {
    const endDate = new Date(lease.end_date);
    if (lease.status === 'active' && endDate < now) {
      return { ...lease, status: 'expired' };
    }
    return lease;
  });
  
  localStorage.setItem('vps_leases', JSON.stringify(updatedLeases));
  
  // For demo purposes, this would typically be a scheduled job
  console.log('Checked lease expirations');
};
