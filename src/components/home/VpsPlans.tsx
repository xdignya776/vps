
import React from 'react';
import { Check, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VpsPlans = () => {
  const plans = [
    {
      name: 'S-1 Intel',
      type: 'Cloud VPS',
      icon: <Server className="h-8 w-8 mb-4 text-dark-navy" />,
      price: '7.00',
      features: [
        '1 vCPU',
        '0.5GB Memory',
        '10GB SSD',
        '512GB Bandwidth',
        'Daily Backups',
        '24/7 Support'
      ]
    },
    {
      name: 'S-2 AMD',
      type: 'Cloud VPS',
      icon: <Server className="h-8 w-8 mb-4 text-dark-navy" />,
      price: '32.50',
      popular: true,
      features: [
        '2 vCPU',
        '2GB Memory',
        '60GB SSD',
        '3TB Bandwidth',
        'Daily Backups',
        '24/7 Support',
        'Free Control Panel'
      ]
    },
    {
      name: 'C-2 Optimized',
      type: 'Cloud VPS',
      icon: <Server className="h-8 w-8 mb-4 text-dark-navy" />,
      price: '64.00',
      features: [
        '2 vCPU',
        '4GB Memory',
        '80GB NVMe SSD',
        '4TB Bandwidth',
        'Daily Backups',
        '24/7 Priority Support',
        'Free Control Panel',
        'Advanced Monitoring'
      ]
    }
  ];

  return (
    <section id="vps-plans" className="py-20 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-poppins">Simplified All-Inclusive Pricing</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Pay only for the hardware you use, with no hidden fees
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`card-white-bg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-lg transform scale-105 md:scale-110' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-center py-1 font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="text-center">
                  {plan.icon}
                  <h3 className="text-xl font-bold font-poppins">{plan.name}</h3>
                  <p className="text-periwinkle mb-4">{plan.type}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold font-poppins">€{plan.price}</span>
                    <span className="text-periwinkle">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-dark-navy flex-shrink-0 mr-2" />
                      <span className="text-periwinkle">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/vps/purchase" className="block">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Choose Plan
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VpsPlans;
