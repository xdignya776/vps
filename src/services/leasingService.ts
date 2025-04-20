
// Export all services from the central file for backward compatibility
import { toast } from "@/hooks/use-toast";
import { createCustomer, getCurrentCustomer, getCustomerByEmail } from './customerService';
import { 
  createBillingCycles, 
  getBillingCyclesByLeaseId, 
  markBillingCycleAsPaid,
  calculateMonthlyProfit
} from './billingService';
import {
  createLease,
  getLeasesByCustomerId,
  getLeaseById,
  updateLeaseStatus,
  checkLeaseExpirations
} from './leaseService';

// Use 'export type' for type re-exports when isolatedModules is enabled
export type { Customer, VpsLease, BillingCycle } from './types';

// Initialize storage
const initializeStorage = () => {
  const leases = localStorage.getItem('vps_leases');
  if (!leases) {
    localStorage.setItem('vps_leases', JSON.stringify([]));
  }
  
  const customers = localStorage.getItem('customers');
  if (!customers) {
    localStorage.setItem('customers', JSON.stringify([]));
  }
  
  const billingCycles = localStorage.getItem('billing_cycles');
  if (!billingCycles) {
    localStorage.setItem('billing_cycles', JSON.stringify([]));
  }
};

// Initialize on import
initializeStorage();

// Re-export all functions
export {
  createCustomer,
  getCurrentCustomer,
  getCustomerByEmail,
  createBillingCycles,
  getBillingCyclesByLeaseId,
  markBillingCycleAsPaid,
  calculateMonthlyProfit,
  createLease,
  getLeasesByCustomerId,
  getLeaseById,
  updateLeaseStatus,
  checkLeaseExpirations
};
