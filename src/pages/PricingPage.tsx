
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import VpsPackageCard from '@/components/vps/VpsPackageCard';
import { DigitalOceanSize, fetchSizes } from '@/services/digitalOceanService';
import { Loader2, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';

const PricingPage = () => {
  const [packages, setPackages] = useState<DigitalOceanSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch real packages from the service
    const loadPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const sizes = await fetchSizes();
        console.log("PricingPage received sizes:", sizes);
        
        if (!sizes || sizes.length === 0) {
          console.error("No VPS packages returned from fetchSizes");
          setError("No VPS packages are available at this time.");
        } else {
          // Sort packages by price
          const sortedSizes = [...sizes].sort((a, b) => a.price_monthly - b.price_monthly);
          setPackages(sortedSizes);
        }
      } catch (error) {
        console.error('Error loading VPS packages for pricing page:', error);
        setError("Failed to load VPS packages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPackages();
  }, []);

  // Function to handle package selection
  const handleSelectPackage = (pkg: DigitalOceanSize) => {
    navigate('/vps/purchase', { 
      state: { selectedPackage: pkg },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Our Pricing Plans</h1>
          
          {/* Display real-time pricing from DigitalOcean */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span>Loading packages...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unable to Load Packages</h3>
              <p className="text-muted-foreground max-w-md">{error}</p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {packages.map((pkg) => (
                <div key={pkg.slug} className="h-full">
                  <VpsPackageCard
                    package={pkg}
                    onSelect={() => handleSelectPackage(pkg)}
                    showDiscountedPrice={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Packages Available</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any VPS packages to display. Please check back later.
              </p>
            </div>
          )}
          
          {/* Control Panel Section */}
          <div className="mt-16">
            <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-md overflow-hidden md:p-12 p-6 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-center">Complete Control Panel Solution</h2>
              
              <p className="text-lg mb-6">
                Every VPS lease includes our Control Panel solution at no additional cost. Enjoy functionality comparable to premium tools like cPanel, Laravel Forge, Runcloud, Plesk, and more!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="font-bold mb-3">Web Hosting Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      One-Click WordPress Installation
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      Advanced Server Caching
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      LiteSpeed Web Server Support
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="font-bold mb-3">Developer Tools</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      Git Deployment
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      SSH Access
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      Composer & NPM Support
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="font-bold mb-3">Security & Management</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      Free SSL Certificates
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      Automatic Backups
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      Server-Level Firewall
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/vps/purchase')}
                >
                  Lease a VPS with Full Control Panel Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
