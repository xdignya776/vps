
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, ArrowRight, Check, Folder, UploadCloud, FileText, Download, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ServerFileManagerProps {
  instanceId: string;
}

const ServerFileManager: React.FC<ServerFileManagerProps> = ({ instanceId }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'fileManager' | 'editFile'>('fileManager');
  const [isFileManagerDeployed, setIsFileManagerDeployed] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [selectedConfigFile, setSelectedConfigFile] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDeployFileManager = () => {
    setIsLoading(true);
    
    // Simulate API call to deploy file manager
    setTimeout(() => {
      setIsFileManagerDeployed(true);
      setShowCredentials(true);
      setIsLoading(false);
      
      toast({
        title: 'File Manager Deployed',
        description: 'The file manager has been deployed to your web root successfully.'
      });
    }, 2000);
  };
  
  const handleDeleteFileManager = () => {
    setIsLoading(true);
    
    // Simulate API call to delete file manager
    setTimeout(() => {
      setIsFileManagerDeployed(false);
      setShowCredentials(false);
      setIsLoading(false);
      
      toast({
        title: 'File Manager Removed',
        description: 'The file manager has been removed from your web root successfully.'
      });
    }, 1500);
  };
  
  const handleFetchFile = () => {
    if (!selectedConfigFile && !filePath) {
      toast({
        title: 'Missing file path',
        description: 'Please select a config file or enter a file path.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    // Use the selected dropdown value or manual path
    const path = selectedConfigFile || filePath;
    
    // Simulate API call to fetch file content
    setTimeout(() => {
      // Mock content based on file type
      let mockContent = '';
      
      if (path.includes('nginx') || path.endsWith('.conf')) {
        mockContent = `# Server configuration\nserver {\n  listen 80;\n  server_name example.com;\n\n  location / {\n    root /var/www/html;\n    index index.php index.html;\n  }\n\n  # PHP handler\n  location ~ \\.php$ {\n    include snippets/fastcgi-php.conf;\n    fastcgi_pass unix:/run/php/php8.0-fpm.sock;\n  }\n}`;
      } else if (path.includes('php') || path.endsWith('.ini')) {
        mockContent = '; PHP Configuration file\ndisplay_errors = Off\nerror_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT\nmax_execution_time = 30\nmemory_limit = 128M\nupload_max_filesize = 20M\npost_max_size = 20M\n; Security settings\nexpose_php = Off\n';
      } else if (path.includes('.htaccess')) {
        mockContent = '# Apache .htaccess file\nRewriteEngine On\nRewriteBase /\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^(.*)$ index.php?q=$1 [L,QSA]\n\n# Security headers\nHeader set X-Content-Type-Options "nosniff"\nHeader set X-XSS-Protection "1; mode=block"\n';
      } else {
        mockContent = `# Configuration file at ${path}\n# This is a mock content for demonstration purposes.\n# In a real application, this would be the actual file content from the server.\n`;
      }
      
      setFileContent(mockContent);
      setActiveTab('editFile');
      setIsLoading(false);
      
      toast({
        title: 'File loaded',
        description: `Successfully fetched content of ${path}`
      });
    }, 1500);
  };
  
  const handleSaveFile = () => {
    if (!fileContent) {
      toast({
        title: 'Empty content',
        description: 'Cannot save empty file content.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to save file
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: 'File saved',
        description: `Successfully saved changes to ${selectedConfigFile || filePath}`,
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* File Manager Deployment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">File Manager</CardTitle>
        </CardHeader>
        <CardContent>
          {!isFileManagerDeployed ? (
            <>
              <Alert className="mb-4 bg-green-50 border-green-200">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Folder className="h-5 w-5 text-green-500" />
                  </div>
                  <AlertDescription className="text-green-800">
                    Clicking the button below will deploy Tiny File Manager to your Web Root. 
                    With the File Manager you can edit files in your web root on your server 
                    directly in your browser. You can upload and download files, create 
                    archives for download and much more.
                  </AlertDescription>
                </div>
              </Alert>
              
              <Button 
                className="w-full flex items-center justify-center"
                onClick={handleDeployFileManager}
                disabled={isLoading}
              >
                {isLoading ? (
                  <><span className="mr-2">Deploying...</span> <ArrowRight className="h-4 w-4 animate-pulse" /></>
                ) : (
                  <><span className="mr-2">Deploy File Manager</span> <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </>
          ) : (
            <>
              <Alert className="mb-4 bg-green-50 border-green-200">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <AlertDescription className="text-green-800">
                    The File Manager has now been deployed to your web root at
                    <code className="mx-1 px-1 py-0.5 bg-green-100 rounded">/var/www/html</code>. 
                    If your web server is configured correctly you should now be able to access 
                    the file manager with the credentials shown below.
                  </AlertDescription>
                </div>
              </Alert>
              
              {showCredentials && (
                <div className="mb-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Username</span>
                    <span className="font-mono">admin</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Password</span>
                    <span className="font-mono">7EykKRB8QUVh</span>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1 flex items-center justify-center"
                  onClick={() => {
                    window.open(`https://filemanager.demo.server/${instanceId}`, '_blank');
                  }}
                >
                  <span className="mr-2">Open File Manager</span> <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={handleDeleteFileManager}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-pulse">Removing...</span>
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <Alert className="mt-4 bg-red-50 border-red-200">
                <div className="flex items-start">
                  <div className="mr-4">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <AlertDescription className="text-red-800">
                    You should always disable and delete the File Manager once you have 
                    finished working with your files. Despite being password protected, the File 
                    Manager is a potential security risk and should always be removed after 
                    you have completed your tasks.
                  </AlertDescription>
                </div>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Pull any Server File to Edit */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{activeTab === 'fileManager' ? 'Pull any Server File to Edit' : 'File Editor'}</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'fileManager' ? (
            <>
              <div className="space-y-4">
                <div>
                  <p className="mb-2">Choose a Config File to edit:</p>
                  <Select onValueChange={setSelectedConfigFile}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a Config File to edit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="/etc/nginx/sites-enabled/default">Nginx Site Configuration</SelectItem>
                      <SelectItem value="/etc/php/8.0/fpm/php.ini">PHP Configuration</SelectItem>
                      <SelectItem value="/var/www/html/.htaccess">Apache .htaccess</SelectItem>
                      <SelectItem value="/etc/mysql/my.cnf">MySQL Configuration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <p className="text-sm text-muted-foreground text-center">OR</p>
                
                <div>
                  <p className="mb-2">Enter a fully qualified path to a file to edit:</p>
                  <Input 
                    placeholder="Enter a file path" 
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center"
                  onClick={handleFetchFile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><span className="mr-2">Fetching File...</span> <ArrowRight className="h-4 w-4 animate-pulse" /></>
                  ) : (
                    <><span className="mr-2">Fetch File</span> <FileText className="h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <p className="mb-2">File contents:</p>
                  <Textarea 
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="font-mono text-sm h-64 bg-gray-50"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setActiveTab('fileManager')}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    variant="default" 
                    className="flex-1 flex items-center justify-center"
                    onClick={handleSaveFile}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <><span className="mr-2">Saving...</span> <ArrowRight className="h-4 w-4 animate-pulse" /></>
                    ) : (
                      <><span className="mr-2">Save Changes</span> <Check className="h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerFileManager;
