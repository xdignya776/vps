
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Power, PowerOff, RefreshCw, Terminal } from 'lucide-react';

interface VPSConsoleProps {
  vpsId: string | number;
  hostname: string;
  ipAddress: string;
  status: 'running' | 'stopped' | 'restarting';
  onClose: () => void;
}

const VPSConsole: React.FC<VPSConsoleProps> = ({
  vpsId,
  hostname,
  ipAddress,
  status: initialStatus,
  onClose
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isConsoleLoading, setIsConsoleLoading] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    'Connecting to VPS...',
    'Establishing secure connection...',
  ]);
  
  // Simulate console output updates
  useEffect(() => {
    if (status === 'running') {
      const timer = setTimeout(() => {
        setConsoleOutput(prev => [
          ...prev,
          'Connection established',
          `Welcome to ${hostname} (${ipAddress})`,
          'Last login: ' + new Date().toLocaleString(),
          'root@' + hostname + ':~# '
        ]);
        setIsConsoleLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else if (status === 'stopped') {
      setConsoleOutput(['VPS is currently powered off. Start the VPS to access the console.']);
      setIsConsoleLoading(false);
    } else if (status === 'restarting') {
      const timer = setTimeout(() => {
        setStatus('running');
        setConsoleOutput([
          'System is restarting...',
          '...',
          '[OK] Started Update UTMP about System Runlevel Changes.',
          `${hostname} login: `
        ]);
        setIsConsoleLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [status, hostname, ipAddress]);
  
  const handlePowerOn = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to start the VPS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus('running');
      setConsoleOutput([
        'Powering on VPS...',
        '...',
        '[OK] Started Update UTMP about System Runlevel Changes.',
        `${hostname} login: `
      ]);
    } catch (error) {
      console.error('Error starting VPS:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePowerOff = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to stop the VPS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus('stopped');
      setConsoleOutput(['VPS is currently powered off. Start the VPS to access the console.']);
    } catch (error) {
      console.error('Error stopping VPS:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRestart = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to restart the VPS
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('restarting');
      setConsoleOutput([
        'Restarting VPS...',
        'Shutting down...',
        'System going down for reboot NOW!'
      ]);
      setIsConsoleLoading(true);
    } catch (error) {
      console.error('Error restarting VPS:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Terminal className="h-5 w-5 mr-2" />
              Console: {hostname}
            </CardTitle>
            <CardDescription>
              IP: {ipAddress} | Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isLoading || status === 'running'}
              onClick={handlePowerOn}
            >
              <Power className="h-4 w-4 mr-1" />
              Start
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isLoading || status === 'stopped'}
              onClick={handlePowerOff}
            >
              <PowerOff className="h-4 w-4 mr-1" />
              Stop
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={isLoading || status === 'stopped' || status === 'restarting'}
              onClick={handleRestart}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Restart
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-black text-green-400 font-mono text-sm p-4 h-96 overflow-y-auto">
          {isConsoleLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading console...</span>
            </div>
          ) : (
            consoleOutput.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t justify-between p-4">
        <Button variant="outline" onClick={onClose}>Close Console</Button>
        <div className="text-xs text-muted-foreground">
          Connected to {hostname} ({ipAddress})
        </div>
      </CardFooter>
    </Card>
  );
};

export default VPSConsole;
