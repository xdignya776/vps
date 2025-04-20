
import { BillingCycle, VpsLease } from './types';

// Billing functions
export const createBillingCycles = (leaseId: string, monthlyAmount: number, numberOfMonths: number): BillingCycle[] => {
  const billingCycles = JSON.parse(localStorage.getItem('billing_cycles') || '[]');
  const newCycles: BillingCycle[] = [];
  
  for (let i = 0; i < numberOfMonths; i++) {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i);
    
    const newCycle: BillingCycle = {
      id: `bill_${Date.now()}_${i}`,
      lease_id: leaseId,
      amount: monthlyAmount,
      due_date: dueDate.toISOString(),
      paid_date: i === 0 ? new Date().toISOString() : null, // First month is paid immediately
      status: i === 0 ? 'paid' : 'pending'
    };
    
    newCycles.push(newCycle);
    billingCycles.push(newCycle);
  }
  
  localStorage.setItem('billing_cycles', JSON.stringify(billingCycles));
  return newCycles;
};

export const getBillingCyclesByLeaseId = (leaseId: string): BillingCycle[] => {
  const billingCycles = JSON.parse(localStorage.getItem('billing_cycles') || '[]');
  return billingCycles.filter((cycle: BillingCycle) => cycle.lease_id === leaseId);
};

export const markBillingCycleAsPaid = (cycleId: string): void => {
  const billingCycles = JSON.parse(localStorage.getItem('billing_cycles') || '[]');
  const updatedCycles = billingCycles.map((cycle: BillingCycle) => {
    if (cycle.id === cycleId) {
      return { 
        ...cycle, 
        paid_date: new Date().toISOString(),
        status: 'paid'
      };
    }
    return cycle;
  });
  
  localStorage.setItem('billing_cycles', JSON.stringify(updatedCycles));
};

// Calculate profit
export const calculateMonthlyProfit = (): number => {
  const leases = JSON.parse(localStorage.getItem('vps_leases') || '[]');
  const activeLeases = leases.filter((lease: VpsLease) => lease.status === 'active');
  
  // Assuming 50% markup on all VPS leases
  return activeLeases.reduce((total: number, lease: VpsLease) => {
    const cost = lease.monthly_price / 2; // Assuming 50% of price is cost
    const profit = lease.monthly_price - cost;
    return total + profit;
  }, 0);
};
