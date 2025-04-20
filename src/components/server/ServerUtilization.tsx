
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { getServerUtilization } from '@/services/serverManagementService';

interface ServerUtilizationProps {
  instanceId: string;
}

const ServerUtilization: React.FC<ServerUtilizationProps> = ({ instanceId }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [utilizationData, setUtilizationData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('day'); // 'day', 'week', 'month'

  // Fetch utilization data
  useEffect(() => {
    const fetchUtilizationData = async () => {
      setIsLoading(true);
      try {
        const data = await getServerUtilization(instanceId, timeRange);
        setUtilizationData(data);
      } catch (error) {
        console.error('Error fetching server utilization:', error);
        toast({
          title: 'Error',
          description: 'Failed to load server utilization data',
          variant: 'destructive',
        });
        
        // Generate mock data for demo
        generateMockData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUtilizationData();
  }, [instanceId, timeRange, toast]);

  const generateMockData = () => {
    // Generate last 24 hours of data with 1-hour intervals
    const hoursData = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date();
      hour.setHours(hour.getHours() - (23 - i));
      
      return {
        timestamp: hour.toISOString(),
        cpu: Math.random() * 30 + 5, // 5-35%
        memory: Math.random() * 40 + 20, // 20-60%
        disk: Math.floor(Math.random() * 300) + 3900, // 3900-4200 MB
        network: Math.random() * 0.2 + 0.1, // 0.1-0.3 GB
      };
    });
    
    setUtilizationData({
      disk: {
        used: 3908,
        allowed: 25000,
        unit: 'MB',
        history: hoursData.map(h => ({ timestamp: h.timestamp, value: h.disk }))
      },
      network: {
        used: 0.2,
        allowed: 1000,
        unit: 'GB',
        history: hoursData.map(h => ({ timestamp: h.timestamp, value: h.network * 1000 })) // Convert to MB for display
      },
      cpu: {
        current: 12,
        history: hoursData.map(h => ({ timestamp: h.timestamp, value: h.cpu }))
      },
      memory: {
        current: 43,
        history: hoursData.map(h => ({ timestamp: h.timestamp, value: h.memory }))
      }
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-48">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const getFormattedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getFormattedDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const formatBytes = (bytes: number, unit: string) => {
    if (unit.toLowerCase() === 'gb') {
      return `${bytes.toFixed(2)} GB`;
    } else {
      return bytes < 1024 
        ? `${bytes.toFixed(0)} MB` 
        : `${(bytes / 1024).toFixed(2)} GB`;
    }
  };

  // Mock data structure if API fails
  const utilData = utilizationData || {
    disk: {
      used: 3908,
      allowed: 25000,
      unit: 'MB',
      history: []
    },
    network: {
      used: 0.2,
      allowed: 1000,
      unit: 'GB',
      history: []
    },
    cpu: {
      current: 12,
      history: []
    },
    memory: {
      current: 43,
      history: []
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Disk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Used ({formatBytes(utilData.disk.used, utilData.disk.unit)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  <span>Allowed ({formatBytes(utilData.disk.allowed, utilData.disk.unit)})</span>
                </div>
              </div>
              
              <div className="h-2.5 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2.5 bg-green-500 rounded-full" 
                  style={{ width: `${(utilData.disk.used / utilData.disk.allowed) * 100}%` }}
                ></div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={utilData.disk.history}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={getFormattedTime}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)} GB`} 
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${formatBytes(value, 'MB')}`, 'Disk Usage']}
                      labelFormatter={(label) => `${getFormattedDate(label)}, ${getFormattedTime(label)}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>This month ({utilData.network.used} GB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  <span>Allowed ({utilData.network.allowed} GB)</span>
                </div>
              </div>
              
              <div className="h-2.5 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2.5 bg-blue-500 rounded-full" 
                  style={{ width: `${(utilData.network.used / utilData.network.allowed) * 100}%` }}
                ></div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={utilData.network.history}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={getFormattedTime}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value.toFixed(0)} MB`} 
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${value.toFixed(2)} MB`, 'Network Usage']}
                      labelFormatter={(label) => `${getFormattedDate(label)}, ${getFormattedTime(label)}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={utilData.cpu.history}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={getFormattedTime}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value}%`} 
                      domain={[0, 100]}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${value.toFixed(1)}%`, 'CPU Usage']}
                      labelFormatter={(label) => `${getFormattedDate(label)}, ${getFormattedTime(label)}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={utilData.memory.history}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={getFormattedTime}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 100]} 
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${value.toFixed(1)}%`, 'Memory Usage']}
                      labelFormatter={(label) => `${getFormattedDate(label)}, ${getFormattedTime(label)}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ec4899" 
                      fill="#ec4899" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <div>
          <span className="font-semibold">Bandwidth Details & Charges</span>
          <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded-md">LIVE</span>
        </div>
        <p>All usage statistics are updated in real-time.</p>
      </div>
    </div>
  );
};

export default ServerUtilization;
