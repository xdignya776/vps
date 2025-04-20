
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Settings,
  FolderArchive,
  Clock,
  Terminal,
  Users,
  Database,
  Upload,
  FileText,
  Globe,
  Lock,
} from 'lucide-react';

interface ServerManagementProps {
  instanceId: string;
}

const ServerManagement: React.FC<ServerManagementProps> = ({ instanceId }) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} requested`,
      description: `Navigating to ${action.toLowerCase()} interface...`,
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Server Management</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Server Activity */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <BarChart3 className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-blue-500 mb-2">Server Activity</h3>
            <p className="text-sm text-muted-foreground mb-4">
              See current and past network, disk, memory and CPU activity for your server
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Server Activity')}
            >
              View Activity
            </Button>
          </CardContent>
        </Card>
        
        {/* Upgrade/Downgrade */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-teal-50 p-3 rounded-full mb-4">
              <Settings className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="text-lg font-medium text-teal-500 mb-2">Upgrade / Downgrade</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade or Downgrade your server hardware
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Server Upgrade')}
            >
              Manage Resources
            </Button>
          </CardContent>
        </Card>
        
        {/* Snapshots */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-indigo-50 p-3 rounded-full mb-4">
              <FolderArchive className="h-6 w-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium text-indigo-500 mb-2">Snapshots</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create and delete server snapshots or restore your server from a snapshot (backups)
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Server Snapshots')}
            >
              Manage Snapshots
            </Button>
          </CardContent>
        </Card>
        
        {/* Cron Jobs */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-purple-50 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium text-purple-500 mb-2">Cron Jobs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage Automated Cron Jobs here
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Cron Jobs')}
            >
              Manage Cron Jobs
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Server Scripts */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-pink-50 p-3 rounded-full mb-4">
              <Terminal className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-medium text-pink-500 mb-2">Server Scripts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Deploy and Execute Scripts or Files to your server
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Server Scripts')}
            >
              Manage Scripts
            </Button>
          </CardContent>
        </Card>
        
        {/* Shell Users */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-orange-50 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium text-orange-500 mb-2">Shell Users</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your Shell/SFTP Users and deploy SSH Public Keys
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Shell Users')}
            >
              Manage Users
            </Button>
          </CardContent>
        </Card>
        
        {/* Manage PHP */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-cyan-50 p-3 rounded-full mb-4">
              <div className="text-cyan-500 font-bold text-lg">PHP</div>
            </div>
            <h3 className="text-lg font-medium text-cyan-500 mb-2">Manage PHP</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Change PHP version and edit PHP Settings here
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('PHP Management')}
            >
              PHP Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Databases */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-amber-50 p-3 rounded-full mb-4">
              <Database className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-lg font-medium text-amber-500 mb-2">Databases</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage MariaDB (MySQL) databases and users
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Database Management')}
            >
              Manage Databases
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Manage FTP */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-lime-50 p-3 rounded-full mb-4">
              <Upload className="h-6 w-6 text-lime-500" />
            </div>
            <h3 className="text-lg font-medium text-lime-500 mb-2">Manage FTP</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage FTP and FTPS users here
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('FTP Management')}
            >
              Manage FTP
            </Button>
          </CardContent>
        </Card>
        
        {/* File Manager */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-emerald-50 p-3 rounded-full mb-4">
              <FileText className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-medium text-emerald-500 mb-2">File Manager</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Access our Web File Manager or pull files from any location on your server
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('File Manager')}
            >
              Open File Manager
            </Button>
          </CardContent>
        </Card>
        
        {/* Server Identity */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-sky-50 p-3 rounded-full mb-4">
              <Globe className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-lg font-medium text-sky-500 mb-2">Server Identity</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Domain routing. Do this before generating new SSL certificates
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Server Identity')}
            >
              Manage Identity
            </Button>
          </CardContent>
        </Card>
        
        {/* SSL Certificates */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-green-50 p-3 rounded-full mb-4">
              <Lock className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-green-500 mb-2">SSL Certificates</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate or re-generate your (free!) Let's Encrypt SSL Certificates
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('SSL Management')}
            >
              Manage SSL
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-semibold pt-4">Third Party Software and Integrations</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Example Third-Party Integration */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-gray-100 p-3 rounded-full mb-4">
              <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No Integrations</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You have no third-party integrations enabled for this server
            </p>
            <Button 
              className="w-full mt-auto" 
              variant="outline"
              onClick={() => handleAction('Add Integration')}
            >
              Add Integration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServerManagement;
