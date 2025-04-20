import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VpsPackageCard from '@/components/vps/VpsPackageCard';
import { DigitalOceanSize, fetchSizes } from '@/services/digitalOceanService';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDiscount } from '@/hooks/useDiscount';

const Pricing = () => {
  const [packages, setPackages] = useState<DigitalOceanSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const sizes = await fetchSizes();
        console.log("Pricing component received sizes:", sizes);
        
        if (!sizes || sizes.length === 0) {
          console.error("No VPS packages returned from fetchSizes");
          setError("No VPS packages are available at this time.");
        } else {
          const sortedSizes = [...sizes].sort((a, b) => a.price_monthly - b.price_monthly);
          console.log("Sorted sizes:", sortedSizes);
          setPackages(sortedSizes.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading VPS packages for pricing section:', error);
        setError("Failed to load VPS packages. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load VPS packages. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPackages();
  }, [toast]);
  
  const handleSelectPackage = (pkg: DigitalOceanSize) => {
    console.log("Selected package from pricing:", pkg.slug);
    
    const userEmail = localStorage.getItem('current_user_email');
    
    if (!userEmail) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to purchase a VPS.",
      });
      navigate('/login', { 
        state: { 
          redirectTo: `/vps/purchase?package=${pkg.slug}` 
        } 
      });
      return;
    }
    
    navigate('/vps/purchase', { 
      state: { selectedPackage: pkg },
    });
  };

  return (
    <section id="pricing" className="py-20 bg-pale">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">VPS Hosting Packages</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Powerful, reliable, and affordable virtual private servers
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading packages...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Packages</h3>
            <p className="text-muted-foreground max-w-md">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/vps')}
            >
              Try All VPS Options
            </Button>
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <div 
                key={pkg.slug} 
                className="animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VpsPackageCard 
                  package={pkg} 
                  onSelect={() => handleSelectPackage(pkg)} 
                  showDiscountedPrice={true}
                  billingCycle="1"
                  className="card-white-bg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Packages Available</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any VPS packages to display at this time. Please check back later or view all options.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/vps')}
            >
              View All VPS Options
            </Button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-teal to-teal/80"
            onClick={() => navigate('/vps')}
          >
            View All VPS Options
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
