import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Terminal, PowerOff, RefreshCw, AlertCircle, CheckCircle2, Shield, Zap, Network } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { getVpsOrdersByEmail } from '@/services/supabaseService';
import { DashboardOrder } from '@/services/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ActiveVPSInstances: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [instances, setInstances] = useState<DashboardOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchVpsInstances = async () => {
      setIsLoading(true);
      const email = localStorage.getItem('current_user_email');
      
      if (!email) {
        setIsLoading(false);
        return;
      }
      
      try {
        const vpsOrders = await getVpsOrdersByEmail(email);
        setInstances(vpsOrders);
      } catch (error) {
        console.error('Error fetching VPS instances:', error);
        toast({
          title: "Error",
          description: "Failed to load your VPS instances. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVpsInstances();
  }, [toast]);
  
  const handlePowerAction = (id: number, action: 'start' | 'stop' | 'restart') => {
    setIsLoading(true);
    
    // Find the instance to update
    const instanceIndex = instances.findIndex(instance => instance.id === id);
    if (instanceIndex === -1) {
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const updatedInstances = [...instances];
      
      if (action === 'start') {
        updatedInstances[instanceIndex] = {
          ...updatedInstances[instanceIndex],
          status: 'active'
        };
        
        toast({
          title: "VPS Started",
          description: `${updatedInstances[instanceIndex].config.hostname} has been started.`
        });
      } 
      else if (action === 'stop') {
        updatedInstances[instanceIndex] = {
          ...updatedInstances[instanceIndex],
          status: 'stopped'
        };
        
        toast({
          title: "VPS Stopped",
          description: `${updatedInstances[instanceIndex].config.hostname} has been stopped.`
        });
      } 
      else if (action === 'restart') {
        // Simulate restart which temporarily sets status to 'restarting'
        updatedInstances[instanceIndex] = {
          ...updatedInstances[instanceIndex],
          status: 'restarting'
        };
        
        setInstances(updatedInstances);
        
        // After a delay, set it back to running
        setTimeout(() => {
          const restartedInstances = [...updatedInstances];
          restartedInstances[instanceIndex] = {
            ...restartedInstances[instanceIndex],
            status: 'active'
          };
          
          setInstances(restartedInstances);
          
          toast({
            title: "VPS Restarted",
            description: `${restartedInstances[instanceIndex].config.hostname} has been restarted.`
          });
        }, 3000);
      }
      
      setInstances(updatedInstances);
      setIsLoading(false);
    }, 1500);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Running</Badge>;
      case 'stopped':
        return <Badge className="bg-red-500">Stopped</Badge>;
      case 'restarting':
        return <Badge className="bg-yellow-500">Restarting</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  const renderAddOnBadges = (instance: DashboardOrder) => {
    const addons = instance.config.addons || {};
    const badges = [];
    
    if (addons.plesk) {
      badges.push(
        <TooltipProvider key="plesk">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="mr-1 bg-blue-50">
                <Shield className="h-3 w-3 mr-1" /> Plesk
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Plesk Control Panel (€5/month)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    if (addons.litespeed) {
      badges.push(
        <TooltipProvider key="litespeed">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="mr-1 bg-yellow-50">
                <Zap className="h-3 w-3 mr-1" /> LiteSpeed
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>LiteSpeed WebServer (€10/month)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    if (addons.extraIpv4) {
      badges.push(
        <TooltipProvider key="ipv4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="mr-1 bg-green-50">
                <Network className="h-3 w-3 mr-1" /> Extra IP
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Extra IPv4 Address (€2/month)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return badges.length > 0 ? badges : null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your VPS Instances</CardTitle>
            <CardDescription>Manage your virtual private servers</CardDescription>
          </div>
          <Button 
            onClick={() => navigate('/vps')}
            size="sm"
          >
            Add New VPS
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading your VPS instances...</p>
          </div>
        ) : instances.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No VPS Instances</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any VPS instances yet. Create your first one to get started.
            </p>
            <Button onClick={() => navigate('/vps')}>
              Lease VPS Now
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Add-ons</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instances.map((instance) => (
                  <TableRow key={instance.id}>
                    <TableCell className="font-medium">
                      {instance.config.hostname}
                    </TableCell>
                    <TableCell>{instance.datacenter}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {instance.package_name.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {renderAddOnBadges(instance)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(instance.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => navigate(`/vps/console?id=${instance.id}`)}
                          title="Open Console"
                        >
                          <Terminal className="h-4 w-4" />
                        </Button>
                        
                        {instance.status === 'active' ? (
                          <Button 
                            variant="outline" 
                            size="icon"
                            title="Restart VPS"
                            onClick={() => handlePowerAction(instance.id, 'restart')}
                            disabled={isLoading}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="icon"
                            title="Start VPS"
                            onClick={() => handlePowerAction(instance.id, 'start')}
                            disabled={isLoading || instance.status === 'active' || instance.status === 'restarting'}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {instance.status !== 'stopped' && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            title="Stop VPS"
                            onClick={() => handlePowerAction(instance.id, 'stop')}
                            disabled={isLoading || instance.status === 'stopped'}
                          >
                            <PowerOff className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/vps/console?id=${instance.id}`)}>
                              Manage VPS
                            </DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>View Backups</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete VPS</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <p className="text-sm text-muted-foreground">
          Showing {instances.length} of {instances.length} VPS instances
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            const fetchVpsInstances = async () => {
              setIsLoading(true);
              const email = localStorage.getItem('current_user_email');
              
              if (!email) {
                setIsLoading(false);
                return;
              }
              
              try {
                const vpsOrders = await getVpsOrdersByEmail(email);
                setInstances(vpsOrders);
                toast({
                  title: "Refreshed",
                  description: "VPS instance data has been refreshed."
                });
              } catch (error) {
                console.error('Error fetching VPS instances:', error);
                toast({
                  title: "Error",
                  description: "Failed to refresh VPS instances. Please try again.",
                  variant: "destructive"
                });
              } finally {
                setIsLoading(false);
              }
            };
            
            fetchVpsInstances();
          }}
          className="flex items-center gap-2"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveVPSInstances;
