
import { Customer } from './types';

// Customer functions
export const createCustomer = (name: string, email: string): Customer => {
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  
  const newCustomer: Customer = {
    id: `cust_${Date.now()}`,
    name,
    email,
    created_at: new Date().toISOString()
  };
  
  customers.push(newCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));
  
  return newCustomer;
};

export const getCustomerByEmail = (email: string): Customer | null => {
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  return customers.find((customer: Customer) => customer.email === email) || null;
};

export const getCurrentCustomer = (): Customer | null => {
  const email = localStorage.getItem('current_user_email');
  if (!email) return null;
  
  return getCustomerByEmail(email);
};
