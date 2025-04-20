
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Network, Cpu, HardDrive, Globe } from 'lucide-react';
import { DashboardOrder } from '@/services/types';

interface ServerOverviewProps {
  instanceId: string;
  serverData?: DashboardOrder | null;
}

const ServerOverview: React.FC<ServerOverviewProps> = ({ instanceId, serverData }) => {
  // Use server data from props if available, otherwise use mock data
  const addons = serverData?.config?.addons || {};
  
  // Default data when real data is not available
  const serverDetails = {
    name: serverData?.config?.hostname || "Demo Server",
    hostname: serverData?.config?.hostname || "demo-vps-01",
    status: serverData?.status || "Running",
    ipv4: "192.168.1.100", // In a real app, this would come from serverData
    location: serverData?.datacenter || "Amsterdam",
    created: new Date(serverData?.created_at || Date.now()).toLocaleDateString(),
    specs: {
      cpu: serverData?.config?.package?.vcpus || 2,
      memory: serverData?.config?.package?.memory ? (serverData.config.package.memory / 1024) : 4,
      disk: serverData?.config?.package?.disk || 80,
      bandwidth: "2 TB" // In a real app, this would come from serverData
    },
    addons: {
      plesk: !!addons.plesk,
      litespeed: !!addons.litespeed,
      extraIpv4: !!addons.extraIpv4
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Server Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Hostname</dt>
              <dd className="font-medium">{serverDetails.hostname}</dd>
              
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <Badge className={`${serverDetails.status.toLowerCase() === 'running' || serverDetails.status.toLowerCase() === 'active' ? 'bg-green-500' : serverDetails.status.toLowerCase() === 'stopped' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  {serverDetails.status}
                </Badge>
              </dd>
              
              <dt className="text-muted-foreground">IPv4</dt>
              <dd className="font-medium">{serverDetails.ipv4}</dd>
              
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-medium">{serverDetails.location}</dd>
              
              <dt className="text-muted-foreground">Created</dt>
              <dd className="font-medium">{serverDetails.created}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Hardware Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div className="flex items-center">
                <Cpu className="h-5 w-5 text-muted-foreground mr-2" />
                <dt className="text-sm text-muted-foreground w-20">CPU</dt>
                <dd className="text-sm font-medium">{serverDetails.specs.cpu} vCores</dd>
              </div>
              
              <div className="flex items-center">
                {/* Using available icon from lucide-react */}
                <HardDrive className="h-5 w-5 text-muted-foreground mr-2" />
                <dt className="text-sm text-muted-foreground w-20">Memory</dt>
                <dd className="text-sm font-medium">{serverDetails.specs.memory} GB RAM</dd>
              </div>
              
              <div className="flex items-center">
                <HardDrive className="h-5 w-5 text-muted-foreground mr-2" />
                <dt className="text-sm text-muted-foreground w-20">Storage</dt>
                <dd className="text-sm font-medium">{serverDetails.specs.disk} GB SSD</dd>
              </div>
              
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-muted-foreground mr-2" />
                <dt className="text-sm text-muted-foreground w-20">Bandwidth</dt>
                <dd className="text-sm font-medium">{serverDetails.specs.bandwidth}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Add-ons & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div className="flex items-center">
                <Shield className={`h-5 w-5 mr-2 ${serverDetails.addons.plesk ? 'text-blue-500' : 'text-muted-foreground'}`} />
                <dt className="text-sm w-32">Plesk Panel</dt>
                <dd className="text-sm font-medium">
                  {serverDetails.addons.plesk ? (
                    <Badge variant="outline" className="bg-blue-50">Active (€5/month)</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100">Not Active</Badge>
                  )}
                </dd>
              </div>
              
              <div className="flex items-center">
                <Zap className={`h-5 w-5 mr-2 ${serverDetails.addons.litespeed ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                <dt className="text-sm w-32">LiteSpeed</dt>
                <dd className="text-sm font-medium">
                  {serverDetails.addons.litespeed ? (
                    <Badge variant="outline" className="bg-yellow-50">Active (€10/month)</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100">Not Active</Badge>
                  )}
                </dd>
              </div>
              
              <div className="flex items-center">
                <Network className={`h-5 w-5 mr-2 ${serverDetails.addons.extraIpv4 ? 'text-green-500' : 'text-muted-foreground'}`} />
                <dt className="text-sm w-32">Extra IPv4</dt>
                <dd className="text-sm font-medium">
                  {serverDetails.addons.extraIpv4 ? (
                    <Badge variant="outline" className="bg-green-50">Active (€2/month)</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100">Not Active</Badge>
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServerOverview;
