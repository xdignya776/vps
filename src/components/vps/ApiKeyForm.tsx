import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getApiKey, setApiKey, validateApiKey } from '@/services/digitalOceanService';
import { toast } from '@/hooks/use-toast';

interface ApiKeyFormProps {
  onApiKeySet: () => void ;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKeyState] = useState(''); // Initialize with an empty string
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    // Fetch the API key from environment variables or a secure source
    const fetchApiKey = async () => {
      const key = await getApiKey(); // Assuming getApiKey fetches the key securely
      setApiKeyState(key || '');
    };
    fetchApiKey();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsValidating(true);

    try {
      const isValid = await validateApiKey(apiKey);

      if (!isValid) {
        toast({
          title: 'Invalid API Key',
          description: 'The provided API key appears to be invalid. Please check and try again.',
          variant: 'destructive',
        });
        return;
      }

      await setApiKey(apiKey); // Save the API key securely
      toast({
        title: 'Success',
        description: 'API key has been saved and verified.',
      });
      onApiKeySet();
    } catch (error) {
      console.error('Error setting API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to save API key.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  };

  const handleClear = () => setApiKeyState('');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Digital Ocean API Key</CardTitle>
        <CardDescription>
          Enter your Digital Ocean API key to fetch available VPS packages. You can find your API key in the DigitalOcean dashboard under API.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="Enter your Digital Ocean API key"
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Your API key is stored locally and never sent to our servers directly. It will be securely passed to our backend for API calls.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit" disabled={isLoading || isValidating}>
            {isLoading || isValidating ? 'Verifying...' : 'Save & Verify Key'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApiKeyForm;
