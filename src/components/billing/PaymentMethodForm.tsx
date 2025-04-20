
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

interface PaymentMethodFormProps {
  isOpen: boolean;
  onClose: () => void;
  isUpdate?: boolean;
  isAddressOnly?: boolean;
  onSuccess?: (data: any) => void;
}

const addressSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(3, "Postal/Zip code is required"),
  country: z.string().min(2, "Country is required"),
});

const cardSchema = z.object({
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string().min(13, "Card number must be valid").max(19, "Card number must be valid"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must not exceed 4 digits"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(3, "Postal/Zip code is required"),
  country: z.string().min(2, "Country is required"),
});

type CardFormValues = z.infer<typeof cardSchema>;
type AddressFormValues = z.infer<typeof addressSchema>;

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ 
  isOpen, 
  onClose, 
  isUpdate = false,
  isAddressOnly = false,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form for address only if isAddressOnly is true
  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });
  
  // Initialize form for card details
  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });
  
  // Format card number as user types
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length <= 16) {
      // Add a space after every 4 digits
      const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
      cardForm.setValue('cardNumber', formattedValue);
    }
  };
  
  // Format expiry date as MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      cardForm.setValue('expiryDate', value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value);
    }
  };
  
  // Detect card type based on card number
  const getCardType = (cardNumber: string): string => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    
    // Basic card type detection
    if (/^4/.test(cleanNumber)) return 'VISA';
    if (/^5[1-5]/.test(cleanNumber)) return 'MC';
    if (/^3[47]/.test(cleanNumber)) return 'AMEX';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'DISC';
    return 'CARD';
  };
  
  const handleCardSubmit = async (values: CardFormValues) => {
    setIsLoading(true);
    
    try {
      // Clean card number to get last 4 digits
      const cardNumber = values.cardNumber.replace(/\s+/g, '');
      const lastFour = cardNumber.slice(-4);
      const cardType = getCardType(cardNumber);
      
      // In a real implementation, we would:
      // 1. Use Stripe.js to create a payment method token
      // 2. Send the token to our backend via Supabase
      // 3. Store the payment method in our database
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isUpdate ? "Card Updated" : "Card Added",
        description: isUpdate 
          ? "Your payment method has been updated successfully" 
          : "Your payment method has been added successfully",
      });
      
      if (onSuccess) {
        onSuccess({
          lastFour,
          expiryDate: values.expiryDate,
          cardHolder: values.cardName,
          cardType,
          // Don't include full card number or CVV!
          billingAddress: {
            name: values.cardName,
            address: values.address,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            country: values.country,
          }
        });
      }
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error processing payment method:', error);
      toast({
        title: "Error",
        description: "There was an error processing your payment method. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddressSubmit = async (values: AddressFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Address Updated",
        description: "Your billing address has been updated successfully",
      });
      
      if (onSuccess) {
        onSuccess({
          name: values.name,
          address: values.address,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
        });
      }
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error",
        description: "There was an error updating your address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isAddressOnly 
              ? 'Update Billing Address' 
              : isUpdate 
                ? 'Update Payment Method' 
                : 'Add Payment Method'}
          </DialogTitle>
          <DialogDescription>
            {isAddressOnly
              ? 'Update your billing address details'
              : isUpdate
                ? 'Update your card details below'
                : 'Enter your card details to add a new payment method'}
          </DialogDescription>
        </DialogHeader>
        
        {isAddressOnly ? (
          <Form {...addressForm}>
            <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4 py-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Billing Address</h3>
                
                <FormField
                  control={addressForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addressForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addressForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addressForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addressForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal/Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addressForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="ES">Spain</SelectItem>
                            <SelectItem value="IT">Italy</SelectItem>
                            <SelectItem value="GR">Greece</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Update Address'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Form {...cardForm}>
            <form onSubmit={cardForm.handleSubmit(handleCardSubmit)} className="space-y-4 py-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Card Information</h3>
                
                <FormField
                  control={cardForm.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={cardForm.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          value={field.value} 
                          onChange={(e) => {
                            field.onChange(e);
                            handleCardNumberChange(e);
                          }}
                          maxLength={19} // 16 digits + 3 spaces
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={cardForm.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              handleExpiryChange(e);
                            }} 
                            maxLength={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={cardForm.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            type="password"
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              if (value.length <= 4) {
                                field.onChange({ ...e, target: { ...e.target, value } });
                              }
                            }}
                            maxLength={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="text-sm font-medium">Billing Address</h3>
                
                <FormField
                  control={cardForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={cardForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={cardForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={cardForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal/Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={cardForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="ES">Spain</SelectItem>
                            <SelectItem value="IT">Italy</SelectItem>
                            <SelectItem value="GR">Greece</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : isUpdate ? 'Update Card' : 'Add Card'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodForm;
