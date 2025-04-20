
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import { getServerCredentials, regeneratePassword } from '@/services/serverManagementService';

interface ServerCredentialsProps {
  instanceId: string;
}

const ServerCredentials: React.FC<ServerCredentialsProps> = ({ instanceId }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [credentials, setCredentials] = useState<any>(null);
  const [showMySQLPassword, setShowMySQLPassword] = useState(false);
  const [showDBPassword, setShowDBPassword] = useState(false);
  const [showFTPPassword, setShowFTPPassword] = useState(false);
  const [regeneratingPassword, setRegeneratingPassword] = useState<string | null>(null);

  // Fetch credentials
  useEffect(() => {
    const fetchCredentials = async () => {
      setIsLoading(true);
      try {
        const data = await getServerCredentials(instanceId);
        setCredentials(data);
      } catch (error) {
        console.error('Error fetching server credentials:', error);
        toast({
          title: 'Error',
          description: 'Failed to load server credentials',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, [instanceId, toast]);

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: 'Copied to clipboard',
          description: `${label} copied to clipboard`,
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: 'Copy failed',
          description: 'Failed to copy to clipboard',
          variant: 'destructive',
        });
      }
    );
  };

  const handleRegeneratePassword = async (service: string) => {
    setRegeneratingPassword(service);
    try {
      const newPassword = await regeneratePassword(instanceId, service);
      setCredentials((prev: any) => {
        if (service === 'mysql') {
          return { ...prev, mysqlRootPassword: newPassword };
        } else if (service === 'database') {
          return { ...prev, databasePassword: newPassword };
        } else if (service === 'ftp') {
          return { ...prev, ftpPassword: newPassword };
        }
        return prev;
      });
      
      toast({
        title: 'Password regenerated',
        description: `New ${service} password has been generated successfully`,
      });
    } catch (error) {
      console.error(`Error regenerating ${service} password:`, error);
      toast({
        title: 'Error',
        description: `Failed to regenerate ${service} password`,
        variant: 'destructive',
      });
    } finally {
      setRegeneratingPassword(null);
    }
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

  // Fallback mock data if API doesn't return real data
  const credentialsData = credentials || {
    mysqlRootUser: 'admin',
    mysqlRootPassword: '8gDu2jrYuM7',
    databaseName: 'demoserver',
    databaseUser: 'demoserver',
    databasePassword: 'wFQOvWMCwHEX',
    ftpUsername: 'demoserver',
    ftpPassword: 'MFREzIreTBAC',
  };

  return (
    <>
      {/* MySQL Credentials */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">MySQL</CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                toast({
                  title: 'Editing credentials',
                  description: 'Launching MySQL credentials editor...',
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Admin (root) user:</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={credentialsData.mysqlRootUser} 
                  className="font-mono bg-muted"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.mysqlRootUser, 'MySQL username')}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Admin password:</label>
              <div className="flex mt-1">
                <div className="relative flex-1">
                  <Input 
                    type={showMySQLPassword ? 'text' : 'password'} 
                    readOnly 
                    value={credentialsData.mysqlRootPassword} 
                    className="font-mono bg-muted pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowMySQLPassword(!showMySQLPassword)}
                  >
                    {showMySQLPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.mysqlRootPassword, 'MySQL password')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => handleRegeneratePassword('mysql')}
                  disabled={regeneratingPassword === 'mysql'}
                >
                  {regeneratingPassword === 'mysql' ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Mysql Database:</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={credentialsData.databaseName} 
                  className="font-mono bg-muted"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.databaseName, 'Database name')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Database user:</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={credentialsData.databaseUser} 
                  className="font-mono bg-muted"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.databaseUser, 'Database username')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Password:</label>
              <div className="flex mt-1">
                <div className="relative flex-1">
                  <Input 
                    type={showDBPassword ? 'text' : 'password'} 
                    readOnly 
                    value={credentialsData.databasePassword} 
                    className="font-mono bg-muted pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowDBPassword(!showDBPassword)}
                  >
                    {showDBPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.databasePassword, 'Database password')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => handleRegeneratePassword('database')}
                  disabled={regeneratingPassword === 'database'}
                >
                  {regeneratingPassword === 'database' ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FTP Credentials */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">FTP <Badge variant="outline" className="ml-2 text-xs">SFTP</Badge></CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                toast({
                  title: 'Editing credentials',
                  description: 'Launching FTP credentials editor...',
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Username:</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={credentialsData.ftpUsername} 
                  className="font-mono bg-muted"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.ftpUsername, 'FTP username')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Password:</label>
              <div className="flex mt-1">
                <div className="relative flex-1">
                  <Input 
                    type={showFTPPassword ? 'text' : 'password'} 
                    readOnly 
                    value={credentialsData.ftpPassword} 
                    className="font-mono bg-muted pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowFTPPassword(!showFTPPassword)}
                  >
                    {showFTPPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard(credentialsData.ftpPassword, 'FTP password')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => handleRegeneratePassword('ftp')}
                  disabled={regeneratingPassword === 'ftp'}
                >
                  {regeneratingPassword === 'ftp' ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Information</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                toast({
                  title: 'Refreshing information',
                  description: 'Updating security information...',
                });
              }}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Password:</label>
              <div className="flex mt-1">
                <div className="relative flex-1">
                  <Input 
                    type="password" 
                    readOnly 
                    value="rRu7Ft98HcbnV2" 
                    className="font-mono bg-muted pr-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2" 
                  onClick={() => handleCopyToClipboard("rRu7Ft98HcbnV2", 'Server password')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// Missing import
import { Badge } from "@/components/ui/badge";

export default ServerCredentials;
