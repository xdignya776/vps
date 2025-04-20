
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LeaseButtonProps {
  packageSlug: string;
  className?: string;
  package?: any;
  isAnnual?: boolean;
}

const LeaseButton: React.FC<LeaseButtonProps> = ({ 
  packageSlug, 
  className,
  package: packageData,
  isAnnual = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClick = () => {
    // Log what's happening
    console.log("Lease button clicked for package:", packageSlug);
    console.log("Package data:", packageData);
    
    if (!packageData && !packageSlug) {
      toast({
        title: "Error",
        description: "No package selected. Please choose a package first.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user is logged in by looking for a token or user data in localStorage
    const userEmail = localStorage.getItem('current_user_email');
    
    if (userEmail) {
      // User is logged in, navigate to purchase flow
      if (packageData) {
        console.log("Navigating to purchase page with package data");
        navigate('/vps/purchase', {
          state: { 
            selectedPackage: packageData,
            isAnnual: isAnnual 
          }
        });
      } else {
        console.log("Navigating to purchase page with package slug only");
        navigate(`/vps/purchase?package=${packageSlug}`, {
          state: { isAnnual: isAnnual }
        });
      }
    } else {
      // User is not logged in, show toast and redirect to login page
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to lease a VPS.",
        variant: "default"
      });
      
      // Pass the redirect URL in the state
      navigate('/login', { 
        state: { 
          redirectTo: `/vps/purchase?package=${packageSlug}` 
        } 
      });
    }
  };
  
  return (
    <Button 
      onClick={handleClick} 
      className={className}
    >
      Lease Now
    </Button>
  );
};

export default LeaseButton;
