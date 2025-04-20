
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  BookOpen, 
  Server, 
  Shield, 
  Database, 
  Terminal, 
  FileCode, 
  Settings, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would trigger a search
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive guides to help you set up, manage, and optimize your DG Servers experience.
            </p>
            
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto relative">
              <Input
                type="search"
                placeholder="Search documentation..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          <Tabs defaultValue="guides" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="guides">Getting Started</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="transition-all hover:shadow-md">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Getting Started with DG Servers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Learn how to create your account, choose a plan, and deploy your first VPS instance.</p>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/documentation/account-creation" className="text-sm flex items-center text-primary hover:underline">
                          Creating Your Account <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/choosing-plan" className="text-sm flex items-center text-primary hover:underline">
                          Choosing the Right Plan <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/first-deployment" className="text-sm flex items-center text-primary hover:underline">
                          Deploying Your First VPS <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader>
                    <Server className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Server Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Control and manage your virtual servers with our intuitive control panel tools.</p>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/documentation/control-panel" className="text-sm flex items-center text-primary hover:underline">
                          Using the Control Panel <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/server-restart" className="text-sm flex items-center text-primary hover:underline">
                          Rebooting & Power Options <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/backup-restore" className="text-sm flex items-center text-primary hover:underline">
                          Backup & Restore <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Security Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Protect your server from threats with our recommended security practices.</p>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/documentation/ssh-security" className="text-sm flex items-center text-primary hover:underline">
                          SSH Keys & Security <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/firewall-setup" className="text-sm flex items-center text-primary hover:underline">
                          Firewall Configuration <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/security-updates" className="text-sm flex items-center text-primary hover:underline">
                          Keeping Your Server Updated <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader>
                    <Database className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Database Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Configure and optimize database servers for your applications.</p>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/documentation/mysql-setup" className="text-sm flex items-center text-primary hover:underline">
                          MySQL/MariaDB Setup <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/postgresql-setup" className="text-sm flex items-center text-primary hover:underline">
                          PostgreSQL Configuration <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/database-backup" className="text-sm flex items-center text-primary hover:underline">
                          Database Backup Strategies <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader>
                    <Terminal className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Command Line Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Learn essential Linux commands for effectively managing your VPS.</p>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/documentation/basic-commands" className="text-sm flex items-center text-primary hover:underline">
                          Basic Linux Commands <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/file-management" className="text-sm flex items-center text-primary hover:underline">
                          File System Management <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/process-management" className="text-sm flex items-center text-primary hover:underline">
                          Process Management <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="transition-all hover:shadow-md">
                  <CardHeader>
                    <FileCode className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Web Server Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Configure and optimize web servers for your applications.</p>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/documentation/nginx-setup" className="text-sm flex items-center text-primary hover:underline">
                          NGINX Configuration <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/apache-setup" className="text-sm flex items-center text-primary hover:underline">
                          Apache Setup <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/documentation/ssl-certificates" className="text-sm flex items-center text-primary hover:underline">
                          SSL Certificates <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Setting Up a LAMP Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A step-by-step guide to installing and configuring Linux, Apache, MySQL, and PHP on your VPS.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/documentation/tutorials/lamp-stack">Read Tutorial</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">WordPress Installation Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Learn how to install and secure WordPress on your DG Servers VPS.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/documentation/tutorials/wordpress">Read Tutorial</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Docker Container Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Deploy applications using Docker containers on your VPS environment.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/documentation/tutorials/docker">Read Tutorial</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Setting Up a Node.js Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Configure your server to host a Node.js application with PM2 and NGINX.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/documentation/tutorials/nodejs">Read Tutorial</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Email Server Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Set up a reliable email server using Postfix and Dovecot on your VPS.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/documentation/tutorials/email-server">Read Tutorial</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">VPN Server Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Create your own VPN server using OpenVPN or WireGuard for secure connections.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/documentation/tutorials/vpn-server">Read Tutorial</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <h3 className="text-lg font-medium mb-4">API References</h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Introduction</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Authentication</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Rate Limits</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm font-medium bg-accent" size="sm">Server Endpoints</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm pl-6" size="sm">List Servers</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm pl-6" size="sm">Create Server</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm pl-6" size="sm">Get Server Details</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm pl-6" size="sm">Update Server</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm pl-6" size="sm">Delete Server</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Backup Endpoints</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Networking</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Billing API</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Webhooks</Button>
                        <Button variant="ghost" className="w-full justify-start text-sm" size="sm">Error Handling</Button>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Server Endpoints</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-medium mb-3">List All Servers</h3>
                          <div className="bg-muted p-3 rounded-md mb-4">
                            <pre className="text-sm"><code>GET /api/v1/servers</code></pre>
                          </div>
                          <p className="mb-4 text-muted-foreground">Returns a list of all servers associated with your account.</p>
                          <h4 className="font-medium mb-2">Query Parameters</h4>
                          <div className="mb-4">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Parameter</th>
                                  <th className="text-left py-2">Type</th>
                                  <th className="text-left py-2">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2">page</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Page number for pagination</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">per_page</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Number of results per page (max: 100)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">status</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by server status (active, inactive)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <h4 className="font-medium mb-2">Response Example</h4>
                          <div className="bg-muted p-3 rounded-md overflow-x-auto">
                            <pre className="text-sm">
{`{
  "servers": [
    {
      "id": "srv-12345",
      "name": "web-server-1",
      "status": "active",
      "region": "ams3",
      "size": "s-2vcpu-4gb",
      "created_at": "2023-04-05T12:00:00Z",
      "ip_address": "123.45.67.89"
    },
    {
      "id": "srv-67890",
      "name": "db-server-1",
      "status": "active",
      "region": "fra1",
      "size": "s-4vcpu-8gb",
      "created_at": "2023-04-06T14:30:00Z",
      "ip_address": "123.45.67.90"
    }
  ],
  "meta": {
    "total": 2,
    "per_page": 25,
    "page": 1,
    "total_pages": 1
  }
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-medium mb-3">Create a New Server</h3>
                          <div className="bg-muted p-3 rounded-md mb-4">
                            <pre className="text-sm"><code>POST /api/v1/servers</code></pre>
                          </div>
                          <p className="mb-4 text-muted-foreground">Creates a new server instance.</p>
                          <h4 className="font-medium mb-2">Request Body Parameters</h4>
                          <div className="mb-4">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Parameter</th>
                                  <th className="text-left py-2">Type</th>
                                  <th className="text-left py-2">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2">name</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Server name (required)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">region</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Server location (required)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">size</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Server size/plan (required)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">image</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">OS image ID (required)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">ssh_keys</td>
                                  <td className="py-2">array</td>
                                  <td className="py-2">Array of SSH key IDs</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">What operating systems do you support?</h3>
                      <p className="text-muted-foreground">
                        We support a wide range of operating systems including Ubuntu, Debian, CentOS, Fedora, Arch Linux, and various versions of Windows Server. You can select your preferred OS during the VPS creation process.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">How do I connect to my VPS?</h3>
                      <p className="text-muted-foreground">
                        You can connect to your Linux VPS using SSH with the credentials provided after deployment. For Windows servers, use Remote Desktop Protocol (RDP). Detailed connection instructions are provided in your server dashboard.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Can I upgrade my VPS plan later?</h3>
                      <p className="text-muted-foreground">
                        Yes, you can easily upgrade your VPS to a larger plan from your control panel. The migration is typically seamless, requiring only a brief restart of your server. Downgrades may require more planning and potential data migration.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">How are backups handled?</h3>
                      <p className="text-muted-foreground">
                        All plans include automated daily backups that are retained for 7 days. Premium plans include more frequent backup options and longer retention periods. You can also create manual backups at any time from your control panel.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">What is your uptime guarantee?</h3>
                      <p className="text-muted-foreground">
                        We offer a 99.9% uptime guarantee for all our VPS services. If we fail to meet this commitment, you'll receive credits according to our Service Level Agreement (SLA).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Do you provide managed services?</h3>
                      <p className="text-muted-foreground">
                        Yes, we offer managed services as an add-on to any VPS plan. Our managed services include security updates, monitoring, troubleshooting, and optimization performed by our expert team.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">How do I install applications on my server?</h3>
                      <p className="text-muted-foreground">
                        We provide one-click installers for popular applications through our control panel. For other applications, you can install them manually using your server's package manager or follow our detailed installation guides in the documentation.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                      <p className="text-muted-foreground">
                        We accept credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and many cryptocurrency options including Bitcoin, Ethereum, and Litecoin.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
