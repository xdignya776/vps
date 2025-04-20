
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DigitalOceanSize } from '@/services/digitalOceanService';
import { fetchSizes } from '@/services/digitalOceanService';
import VpsPackageCard from '@/components/vps/VpsPackageCard';
import VpsCategories from '@/components/vps/VpsCategories';
import VpsFilters from '@/components/vps/VpsFilters';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const VPS = () => {
  const [sizes, setSizes] = useState<DigitalOceanSize[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<DigitalOceanSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('price_low');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [isAnnual, setIsAnnual] = useState(false);
  const [billingCycle, setBillingCycle] = useState("1");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSizes();
      console.log("Fetched packages:", data);
      setSizes(data);
      
      if (data.length > 0) {
        // Calculate prices with markup and profit margin for price range
        const prices = data.map(size => (size.price_monthly * 1.5) + 3);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices)) + 10; // Add some buffer
        setPriceRange([minPrice, maxPrice]);
        setMaxPrice(maxPrice);
      } else {
        toast({
          title: "No packages found",
          description: "No VPS packages are available at this time.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch VPS packages. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Update billing cycle when annual toggle changes
  useEffect(() => {
    setBillingCycle(isAnnual ? "12" : "1");
  }, [isAnnual]);

  // Apply filters whenever the filter criteria change
  useEffect(() => {
    if (sizes.length === 0) return;
    
    let filtered = [...sizes];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(size => {
        const slug = size.slug;
        const desc = size.description?.toLowerCase() || '';

        switch (selectedCategory) {
          case 'standard':
            return slug.includes('s-') || slug.startsWith('basic') || desc.includes('standard');
          case 'premium':
            return slug.includes('c-') || slug.startsWith('premium') || desc.includes('premium');
          case 'dedicated':
            return slug.includes('m-') || slug.includes('g-') || 
                   slug.startsWith('dedicated') || desc.includes('dedicated');
          default:
            return true;
        }
      });
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(size => 
        size.slug.toLowerCase().includes(term) || 
        (size.description && size.description.toLowerCase().includes(term))
      );
    }
    
    // Apply price range filter with markup and profit margin considered
    filtered = filtered.filter(size => {
      const adjustedPrice = (size.price_monthly * 1.5) + 3;
      return adjustedPrice >= priceRange[0] && adjustedPrice <= priceRange[1];
    });
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'price_low':
          return a.price_monthly - b.price_monthly;
        case 'price_high':
          return b.price_monthly - a.price_monthly;
        case 'cpu':
          return b.vcpus - a.vcpus;
        case 'memory':
          return b.memory - a.memory;
        case 'disk':
          return b.disk - a.disk;
        default:
          return a.price_monthly - b.price_monthly;
      }
    });
    
    console.log("Filtered sizes:", filtered.length, "Selected category:", selectedCategory);
    setFilteredSizes(filtered);
  }, [sizes, selectedCategory, searchTerm, sortOrder, priceRange]);

  const handleSelectPackage = (pkg: DigitalOceanSize) => {
    console.log("Selecting package:", pkg.slug);
    navigate(`/vps/purchase`, {
      state: { 
        selectedPackage: pkg,
        isAnnual: isAnnual 
      }
    });
  };
  
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setSortOrder('price_low');
    setPriceRange([0, maxPrice]);
  };

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">VPS Packages</h1>
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${!isAnnual ? 'font-medium' : ''}`}>Monthly</span>
            <Switch 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              aria-label="Toggle annual pricing"
            />
            <span className={`text-sm ${isAnnual ? 'font-medium' : ''}`}>Annual</span>
          </div>
        </div>

        <VpsCategories 
          category={selectedCategory} 
          setCategory={setSelectedCategory} 
          packages={sizes}
        />
        
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 md:col-span-3">
            <VpsFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              range={priceRange}
              setRange={setPriceRange}
              maxPrice={maxPrice}
              onClearFilters={handleClearFilters}
              hasActiveFilters={
                selectedCategory !== null || 
                searchTerm !== '' || 
                sortOrder !== 'price_low' ||
                priceRange[0] !== 0 || 
                priceRange[1] !== maxPrice
              }
            />
          </div>
          
          <div className="col-span-12 md:col-span-9">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredSizes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSizes.map((size) => (
                  <VpsPackageCard 
                    key={size.slug}
                    package={size}
                    onPurchase={() => handleSelectPackage(size)}
                    isAnnual={isAnnual}
                    showDiscountedPrice={true}
                    billingCycle={billingCycle}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium mb-2">No packages match your filters</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
                <Button onClick={handleClearFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VPS;
