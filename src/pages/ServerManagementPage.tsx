
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ServerOverview from '@/components/server/ServerOverview';
import ServerManagement from '@/components/server/ServerManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getVpsOrderById } from '@/services/supabaseService';
import { DashboardOrder } from '@/services/types';

const ServerManagementPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const instanceId = searchParams.get('id');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [serverData, setServerData] = useState<DashboardOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchServerData = async () => {
      if (!instanceId) return;
      
      try {
        setIsLoading(true);
        // Convert instanceId to number since it's stored as a number in the database
        const id = parseInt(instanceId);
        if (isNaN(id)) {
          throw new Error('Invalid server ID');
        }
        
        const data = await getVpsOrderById(id);
        if (data) {
          setServerData(data);
        } else {
          toast({
            title: "Server not found",
            description: "Could not find the requested server.",
            variant: "destructive"
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching server data:', error);
        toast({
          title: "Error",
          description: "Failed to load server details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServerData();
  }, [instanceId, navigate, toast]);
  
  // Validate instance ID
  if (!instanceId) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto p-4 sm:p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No Server Selected</h2>
            <p className="text-muted-foreground mb-6">
              Please select a server from the dashboard to manage.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </>
    );
  }
  
  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <div className="container mx-auto p-4 sm:p-6">
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
            <h2 className="text-lg font-medium">Loading server details...</h2>
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
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              {serverData?.config.hostname || "Server"}
              <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                <span className="sr-only">Edit server name</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </Button>
            </h1>
            <p className="text-muted-foreground">
              Manage your server settings, resources, and applications
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="files">File Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ServerOverview instanceId={instanceId} serverData={serverData} />
          </TabsContent>
          
          <TabsContent value="credentials">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ServerCredentials instanceId={instanceId} />
            </div>
          </TabsContent>
          
          <TabsContent value="utilization">
            <ServerUtilization instanceId={instanceId} />
          </TabsContent>
          
          <TabsContent value="management">
            <ServerManagement instanceId={instanceId} />
          </TabsContent>
          
          <TabsContent value="files">
            <ServerFileManager instanceId={instanceId} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// Components referenced above
import ServerCredentials from '@/components/server/ServerCredentials';
import ServerUtilization from '@/components/server/ServerUtilization';
import ServerFileManager from '@/components/server/ServerFileManager';

export default ServerManagementPage;
