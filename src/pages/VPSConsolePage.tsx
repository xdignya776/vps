
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import VPSConsoleView from '@/components/vps/VPSConsoleView';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VPSDetails {
  id: string;
  hostname: string;
  ipAddress: string;
  region: string;
  status: 'running' | 'stopped' | 'restarting' | 'provisioning';
}

const VPSConsolePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const instanceId = searchParams.get('id');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [vpsDetails, setVpsDetails] = useState<VPSDetails | null>(null);
  
  useEffect(() => {
    // In a real app, this would fetch the VPS details from your API
    const fetchVpsDetails = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (!instanceId) {
          throw new Error('No instance ID provided');
        }
        
        // Mock data - in a real app this would come from your backend
        const mockVpsDetails: VPSDetails = {
          id: instanceId,
          hostname: `vps-${instanceId.substring(0, 6)}`,
          ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
          region: 'Frankfurt, Germany',
          status: 'running',
        };
        
        setVpsDetails(mockVpsDetails);
      } catch (error) {
        console.error('Error fetching VPS details:', error);
        toast({
          title: "Error",
          description: "Failed to load VPS details. Please try again.",
          variant: "destructive"
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVpsDetails();
  }, [instanceId, navigate, toast]);
  
  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-medium">Loading VPS details...</h2>
              <p className="text-muted-foreground">Please wait while we fetch your VPS information.</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (!vpsDetails) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">VPS Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The VPS instance you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Button>
        
        <VPSConsoleView 
          hostname={vpsDetails.hostname}
          ipAddress={vpsDetails.ipAddress}
          region={vpsDetails.region}
          status={vpsDetails.status}
          instanceId={vpsDetails.id}
        />
      </div>
    </>
  );
};

export default VPSConsolePage;
