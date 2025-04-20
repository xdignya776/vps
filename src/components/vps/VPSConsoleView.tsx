import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Power, RefreshCw, Terminal, Shield, HardDrive, Activity, FileText, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

interface VPSConsoleViewProps {
  hostname: string;
  ipAddress: string;
  region: string;
  status?: 'running' | 'stopped' | 'restarting' | 'provisioning';
  instanceId?: string;
}

const VPSConsoleView: React.FC<VPSConsoleViewProps> = ({
  hostname,
  ipAddress,
  region,
  status = 'running',
  instanceId = 'vps-' + Math.random().toString(36).substring(2, 10)
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(Math.floor(Math.random() * 30) + 5); // Random usage between 5-35%
  const [ramUsage, setRamUsage] = useState(Math.floor(Math.random() * 40) + 10); // Random usage between 10-50%
  const [diskUsage, setDiskUsage] = useState(Math.floor(Math.random() * 25) + 5); // Random usage between 5-30%
  
  // Simulate changing usage statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(Math.max(prev + (Math.random() * 10 - 5), 0), 100));
      setRamUsage(prev => Math.min(Math.max(prev + (Math.random() * 8 - 4), 0), 100));
      setDiskUsage(prev => Math.min(Math.max(prev + (Math.random() * 2 - 0.5), 0), 100));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePowerAction = (action: 'start' | 'stop' | 'restart') => {
    setIsLoading(true);
    
    // Simulate API call to change VPS power state
    setTimeout(() => {
      setIsLoading(false);
      
      if (action === 'start') {
        setCurrentStatus('running');
        toast({
          title: "VPS Started",
          description: `${hostname} has been started successfully.`
        });
      } else if (action === 'stop') {
        setCurrentStatus('stopped');
        toast({
          title: "VPS Stopped",
          description: `${hostname} has been stopped successfully.`
        });
      } else if (action === 'restart') {
        setCurrentStatus('restarting');
        
        // Simulate reboot time
        setTimeout(() => {
          setCurrentStatus('running');
          toast({
            title: "VPS Restarted",
            description: `${hostname} has been restarted successfully.`
          });
        }, 5000);
      }
    }, 2000);
  };
  
  const handleOpenConsole = () => {
    toast({
      title: "Console Access",
      description: "Opening console in a new window...",
    });
    
    // In a real implementation, this would open a terminal interface
    window.open(`/vps/console?id=${instanceId}`, '_blank');
  };

  const handleOpenServerManagement = () => {
    navigate(`/server-management?id=${instanceId}`);
  };
  
  const getStatusColor = () => {
    switch (currentStatus) {
      case 'running':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-red-500';
      case 'restarting':
        return 'bg-yellow-500';
      case 'provisioning':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{hostname}</h1>
          <p className="text-muted-foreground">{ipAddress} • {region}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${getStatusColor()}`}></div>
            <span className="capitalize">{currentStatus}</span>
          </div>
          <Badge variant="outline">Instance ID: {instanceId.substring(0, 8)}</Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>VPS Control Panel</CardTitle>
          <CardDescription>Manage and monitor your virtual server</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="overview">
          <div className="px-6">
            <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="power">Power</TabsTrigger>
              <TabsTrigger value="console">Console</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">CPU Usage</h3>
                  </div>
                  <div className="mt-2">
                    <div className="h-2.5 w-full bg-muted-foreground/20 rounded-full">
                      <div 
                        className="h-2.5 bg-primary rounded-full" 
                        style={{ width: `${cpuUsage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right mt-1">{cpuUsage.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">RAM Usage</h3>
                  </div>
                  <div className="mt-2">
                    <div className="h-2.5 w-full bg-muted-foreground/20 rounded-full">
                      <div 
                        className="h-2.5 bg-primary rounded-full" 
                        style={{ width: `${ramUsage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right mt-1">{ramUsage.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Disk Usage</h3>
                  </div>
                  <div className="mt-2">
                    <div className="h-2.5 w-full bg-muted-foreground/20 rounded-full">
                      <div 
                        className="h-2.5 bg-primary rounded-full" 
                        style={{ width: `${diskUsage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right mt-1">{diskUsage.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">System Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Operating System:</span>
                      <span>Ubuntu 22.04 LTS</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Kernel:</span>
                      <span>5.15.0-56-generic</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">IPv4 Address:</span>
                      <span>{ipAddress}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">IPv6 Address:</span>
                      <span>2001:db8::ff00:42:8329</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Instance Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="capitalize">{currentStatus}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{region}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Hostname:</span>
                      <span>{hostname}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Instance ID:</span>
                      <span>{instanceId}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="power">
              <div className="space-y-4">
                <p>Control the power state of your VPS instance.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handlePowerAction('start')} 
                    variant="outline" 
                    className="flex items-center gap-2"
                    disabled={currentStatus === 'running' || isLoading}
                  >
                    <Power className="h-4 w-4" />
                    Start
                  </Button>
                  
                  <Button 
                    onClick={() => handlePowerAction('stop')} 
                    variant="outline" 
                    className="flex items-center gap-2"
                    disabled={currentStatus === 'stopped' || isLoading}
                  >
                    <Power className="h-4 w-4" />
                    Stop
                  </Button>
                  
                  <Button 
                    onClick={() => handlePowerAction('restart')} 
                    variant="outline" 
                    className="flex items-center gap-2"
                    disabled={currentStatus === 'stopped' || currentStatus === 'restarting' || isLoading}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Restart
                  </Button>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <h3 className="font-medium mb-2">Important Notes</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Starting a stopped VPS may take up to 60 seconds</li>
                    <li>Stopping a VPS will not affect stored data</li>
                    <li>Forced restarts may cause data loss if processes are writing to disk</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="console">
              <div className="space-y-4">
                <p>
                  Access your VPS via web console. This provides terminal access
                  without requiring SSH configuration.
                </p>
                
                <Button 
                  onClick={handleOpenConsole} 
                  className="flex items-center gap-2"
                  disabled={currentStatus !== 'running'}
                >
                  <Terminal className="h-4 w-4" />
                  Open Console
                </Button>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <h3 className="font-medium mb-2">Console Access Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Default username: root</li>
                    <li>Password: The one you set during VPS creation</li>
                    <li>Console sessions will timeout after 30 minutes of inactivity</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="network">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Network Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Hostname:</span>
                      <span>{hostname}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Primary IPv4:</span>
                      <span>{ipAddress}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">IPv6 Network:</span>
                      <span>2001:db8::/64</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Gateway:</span>
                      <span>{ipAddress.split('.').slice(0, 3).join('.')}.1</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Firewall Rules</h3>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Shield className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Allow HTTP (Port 80)</span>
                      <Badge>Active</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Allow HTTPS (Port 443)</span>
                      <Badge>Active</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Allow SSH (Port 22)</span>
                      <Badge>Active</Badge>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Network Usage</h3>
                    <span className="text-sm text-muted-foreground">Current month</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Incoming</span>
                        <span>45.3 GB / 1000 GB</span>
                      </div>
                      <div className="h-2 w-full bg-muted-foreground/20 rounded-full mt-1">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '4.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Outgoing</span>
                        <span>32.8 GB / 1000 GB</span>
                      </div>
                      <div className="h-2 w-full bg-muted-foreground/20 rounded-full mt-1">
                        <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '3.3%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="storage">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Storage Information</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Main Disk (SSD)</span>
                        <span>{diskUsage.toFixed(1)}% used</span>
                      </div>
                      <div className="h-2 w-full bg-muted-foreground/20 rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${diskUsage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>{Math.floor(diskUsage * 0.25)}GB used</span>
                        <span>25GB total</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Swap</span>
                        <span>12% used</span>
                      </div>
                      <div className="h-2 w-full bg-muted-foreground/20 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '12%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>0.24GB used</span>
                        <span>2GB total</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Backup Status</h3>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Daily Backup</h4>
                      <p className="text-sm text-muted-foreground">May 28, 2023 - 03:45 AM</p>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Weekly Backup</h4>
                      <p className="text-sm text-muted-foreground">May 21, 2023 - 04:12 AM</p>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Monthly Backup</h4>
                      <p className="text-sm text-muted-foreground">May 1, 2023 - 03:30 AM</p>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logs">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">System Logs</h3>
                  <Button variant="outline" size="sm" className="h-8">
                    <FileText className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
                
                <div className="border rounded-lg">
                  <div className="bg-muted p-2 border-b flex justify-between items-center">
                    <span className="font-mono text-sm">/var/log/syslog</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="bg-muted p-2 border-b flex justify-between items-center">
                    <span className="font-mono text-sm">/var/log/auth.log</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="bg-muted p-2 border-b flex justify-between items-center">
                    <span className="font-mono text-sm">/var/log/kern.log</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="bg-muted p-2 flex justify-between items-center">
                    <span className="font-mono text-sm">/var/log/apache2/error.log</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>VPS Restart</span>
                      <span className="text-muted-foreground">Yesterday, 14:23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SSH Login from 192.168.1.24</span>
                      <span className="text-muted-foreground">Yesterday, 10:12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Package Updates Installed</span>
                      <span className="text-muted-foreground">May 28, 2023, 03:45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VPS Created</span>
                      <span className="text-muted-foreground">May 20, 2023, 15:32</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                setCpuUsage(Math.floor(Math.random() * 30) + 5);
                setRamUsage(Math.floor(Math.random() * 40) + 10);
                setDiskUsage(Math.floor(Math.random() * 25) + 5);
                
                toast({
                  title: "Statistics Refreshed",
                  description: "VPS statistics have been updated."
                });
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Stats
            </Button>
            
            <Button
              onClick={handleOpenServerManagement}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Advanced Management
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VPSConsoleView;
