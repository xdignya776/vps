
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Server } from 'lucide-react';

interface PurchaseCompleteProps {
  hostname: string;
  ipAddress?: string;
  region?: string;
}

const PurchaseComplete: React.FC<PurchaseCompleteProps> = ({ 
  hostname, 
  ipAddress = "Provisioning...",
  region = ""
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate a real-time update from the server
    const timer = setTimeout(() => {
      // In a real app, this would be updated via a WebSocket or polling
      console.log("VPS provisioning completed");
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <div className="mx-auto bg-green-100 p-3 rounded-full mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-2xl">VPS Successfully Ordered!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-md">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Hostname:</span>
            <span>{hostname}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">IP Address:</span>
            <span>{ipAddress}</span>
          </div>
          {region && (
            <div className="flex justify-between">
              <span className="font-medium">Region:</span>
              <span>{region}</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">
          Your VPS is being provisioned. You'll receive an email when it's ready.
          You can already start managing it from your dashboard.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/vps')}>
          Order Another VPS
        </Button>
        <Button onClick={() => navigate('/dashboard')} className="flex items-center">
          <Server className="h-4 w-4 mr-2" />
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PurchaseComplete;
