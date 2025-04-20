
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { DigitalOceanSize, DigitalOceanRegion } from '@/services/digitalOceanService';
import { fetchSizes, fetchRegions } from '@/services/digitalOceanService';
import PurchaseComplete from '@/components/vps/PurchaseComplete';
import VPSPurchase from '@/components/vps/VPSPurchase';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VPSPurchasePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const packageSlug = searchParams.get('package') || '';
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedPackage, setSelectedPackage] = useState<DigitalOceanSize | null>(
    location.state?.selectedPackage || null
  );
  const [isAnnual, setIsAnnual] = useState<boolean>(
    location.state?.isAnnual || false
  );
  const [availableRegions, setAvailableRegions] = useState<DigitalOceanRegion[]>([]);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [purchasedDetails, setPurchasedDetails] = useState({
    hostname: '',
    ipAddress: '',
    region: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPackageAndRegions = async () => {
      if (!packageSlug && !selectedPackage) {
        toast({
          title: "Error",
          description: "No package selected. Please choose a package first.",
          variant: "destructive"
        });
        navigate('/vps');
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Fetch sizes and regions from the service
        const sizes = await fetchSizes();
        const regions = await fetchRegions();
        
        // Find the selected package by slug if not already in state
        if (!selectedPackage) {
          const selected = sizes.find(size => size.slug === packageSlug);
          
          if (selected) {
            setSelectedPackage(selected);
          } else {
            toast({
              title: "Error",
              description: "Selected package not found.",
              variant: "destructive"
            });
            navigate('/vps');
            return;
          }
          
          // Filter regions that are available for this package
          const availableForPackage = regions.filter(region => 
            selected?.regions.includes(region.slug) && region.available
          );
          
          setAvailableRegions(availableForPackage);
        } else {
          // Use the selected package from state
          const availableForPackage = regions.filter(region => 
            selectedPackage.regions.includes(region.slug) && region.available
          );
          
          setAvailableRegions(availableForPackage);
        }
      } catch (error) {
        console.error('Error loading package data:', error);
        toast({
          title: "Error",
          description: "Failed to load package details. Please try again.",
          variant: "destructive"
        });
        navigate('/vps');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check for authentication
    const userEmail = localStorage.getItem('current_user_email');
    if (!userEmail) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to purchase a VPS.",
      });
      navigate('/login', { 
        state: { 
          redirectTo: `/vps/purchase?package=${packageSlug}` 
        } 
      });
      return;
    }
    
    // Proceed with loading packages and regions
    loadPackageAndRegions();
  }, [packageSlug, selectedPackage, navigate, location.state]);
  
  const handlePurchaseSuccess = (hostname: string, region: string) => {
    // In a real application, this would receive the actual IP address from the backend
    const regionName = availableRegions.find(r => r.slug === region)?.name || 'Unknown Region';
    
    setPurchasedDetails({
      hostname,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Simulated IP
      region: regionName
    });
    
    setPurchaseComplete(true);
    
    // Update local storage to indicate a successful purchase
    localStorage.setItem('has_purchased_vps', 'true');
  };
  
  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-medium">Loading Package Details</h2>
              <p className="text-muted-foreground">Please wait while we fetch the package information...</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (purchaseComplete) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto p-4 max-w-4xl">
          <PurchaseComplete 
            hostname={purchasedDetails.hostname}
            ipAddress={purchasedDetails.ipAddress}
            region={purchasedDetails.region}
          />
          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </>
    );
  }
  
  if (!selectedPackage) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto p-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Package Not Found</h1>
            <p className="mb-6">The requested VPS package could not be found.</p>
            <Button onClick={() => navigate('/vps')}>
              Browse Available Packages
            </Button>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto p-4 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate('/vps')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to packages
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">Purchase VPS</h1>
        
        {selectedPackage && availableRegions.length > 0 && (
          <VPSPurchase 
            selectedPackage={selectedPackage}
            availableRegions={availableRegions}
            onPurchaseSuccess={handlePurchaseSuccess}
            isAnnual={isAnnual}
            initialBillingCycle={isAnnual ? "12" : "1"}
          />
        )}
        
        {selectedPackage && availableRegions.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <h2 className="text-xl font-medium mb-2">No Available Regions</h2>
            <p className="text-muted-foreground mb-6">
              There are currently no available regions for this package. Please select a different package.
            </p>
            <Button onClick={() => navigate('/vps')}>
              Browse Other Packages
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default VPSPurchasePage;
