
import { useState, useEffect } from 'react';
import { DigitalOceanSize } from '@/services/digitalOceanService';

export const useDiscount = (
  selectedPackage: DigitalOceanSize,
  duration: string
) => {
  const [discountedPrice, setDiscountedPrice] = useState(selectedPackage.price_monthly);

  useEffect(() => {
    const durationMonths = parseInt(duration || '1');
    let price = selectedPackage.price_monthly;
    
    // Apply our markup (50% in this example)
    price = price * 1.5;
    
    // Add €1 profit margin (was €3)
    price = price + 1;
    
    // Apply discounts for longer terms after adding profit and markup
    if (durationMonths === 3) {
      price = price * 0.95; // 5% discount
    } else if (durationMonths === 6) {
      price = price * 0.9; // 10% discount
    } else if (durationMonths === 12) {
      price = price * 0.85; // 15% discount
    }
    
    // Round to 2 decimal places for display
    setDiscountedPrice(Math.round(price * 100) / 100);
  }, [duration, selectedPackage.price_monthly]);

  return discountedPrice;
};
