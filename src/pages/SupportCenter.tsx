import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2,
  Clock
} from 'lucide-react';

const SupportCenter: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-lg text-muted-foreground">
              Get the help you need with our comprehensive support resources.
            </p>
            
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Support cards have been removed as requested */}
          
          <Tabs defaultValue="quick-help" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="quick-help">Quick Help</TabsTrigger>
              <TabsTrigger value="knowledgebase">Knowledge Base</TabsTrigger>
              <TabsTrigger value="system-status">System Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quick-help">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Common Issues</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>My VPS is running slow. What can I do?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Slow VPS performance can be caused by several factors:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                          <li>High CPU or memory usage from applications</li>
                          <li>Disk space running low</li>
                          <li>Network congestion</li>
                        </ul>
                        <p>Check your server's resource utilization in the dashboard and consider upgrading your plan if you're consistently using most of your allocated resources.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>I can't connect to my server via SSH</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">If you're having trouble connecting to your server via SSH, try these steps:</p>
                        <ol className="list-decimal pl-5 space-y-1 mb-2">
                          <li>Verify your server is running in the dashboard</li>
                          <li>Double-check your SSH credentials</li>
                          <li>Ensure your firewall allows SSH connections (port 22)</li>
                          <li>Try using the web console in your dashboard to access your server</li>
                        </ol>
                        <p>If you're still unable to connect, please contact our support team for assistance.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I reset my server password?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">To reset your server password:</p>
                        <ol className="list-decimal pl-5 space-y-1 mb-2">
                          <li>Log in to your DG Servers dashboard</li>
                          <li>Navigate to your server details page</li>
                          <li>Click on the "Reset Password" button</li>
                          <li>Follow the prompts to set a new password</li>
                        </ol>
                        <p>Note: Resetting the password will require a server reboot.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>My website is showing a 500 error</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">A 500 internal server error usually indicates a problem with your website's configuration or code. Here are some troubleshooting steps:</p>
                        <ol className="list-decimal pl-5 space-y-1 mb-2">
                          <li>Check your web server error logs</li>
                          <li>Verify file permissions are set correctly</li>
                          <li>Check your website's configuration files</li>
                          <li>Ensure your server has adequate resources</li>
                        </ol>
                        <p>If you're using a content management system, try disabling plugins or themes to identify the cause.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div className="space-y-8">
                  {/* Support ticket form and support hours have been removed as requested */}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="knowledgebase">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" size="sm">Getting Started (14)</Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">Account Management (8)</Button>
                    <Button variant="secondary" className="w-full justify-start" size="sm">Server Administration (23)</Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">Billing & Payments (11)</Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">Security (16)</Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">Network & DNS (9)</Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">Backup & Recovery (7)</Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">Control Panel (13)</Button>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-medium mb-4">Server Administration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Installing and Configuring NGINX</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Learn how to install, configure, and optimize NGINX as a web server or reverse proxy on your VPS.</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="link" className="p-0">Read article</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Server Firewall Configuration Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">A comprehensive guide to setting up and managing firewall rules to protect your server from unauthorized access.</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="link" className="p-0">Read article</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">MySQL Database Management</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Best practices for MySQL installation, configuration, backup, and performance optimization.</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="link" className="p-0">Read article</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Managing Services with Systemd</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Learn how to create, manage, and troubleshoot system services using systemd on Linux servers.</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="link" className="p-0">Read article</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">SSL Certificate Installation Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Step-by-step instructions for obtaining and installing SSL certificates on various web servers.</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="link" className="p-0">Read article</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Optimizing Server Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">Techniques for monitoring and improving the performance of your VPS through resource allocation and configuration.</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="link" className="p-0">Read article</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="system-status">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">System Status</CardTitle>
                    <p className="text-sm text-muted-foreground">Last updated: 8 April 2025, 14:30 EET</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300 rounded-md">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">All systems operational</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Service Status</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Service</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-left py-2">Uptime</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">VPS Hosting Platform</td>
                            <td className="py-3 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                              <span>Operational</span>
                            </td>
                            <td className="py-3">99.99%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">Control Panel</td>
                            <td className="py-3 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                              <span>Operational</span>
                            </td>
                            <td className="py-3">100%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">Network Infrastructure</td>
                            <td className="py-3 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                              <span>Operational</span>
                            </td>
                            <td className="py-3">99.97%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">Domain Name Services</td>
                            <td className="py-3 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                              <span>Operational</span>
                            </td>
                            <td className="py-3">100%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">Backup Systems</td>
                            <td className="py-3 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                              <span>Partial Degradation</span>
                            </td>
                            <td className="py-3">98.50%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">Billing System</td>
                            <td className="py-3 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                              <span>Operational</span>
                            </td>
                            <td className="py-3">99.95%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Recent Incidents</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-amber-500" />
                              <span className="font-medium">Scheduled Maintenance</span>
                            </div>
                            <span className="text-sm text-muted-foreground">April 5, 2025</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Network infrastructure upgrades will be performed in our Athens datacenter. Expected downtime is 30-60 minutes between 02:00 - 04:00 EET.
                          </p>
                          <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 py-0.5 px-2 rounded-full">
                            Upcoming
                          </span>
                        </div>
                        
                        <div className="p-4 border rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                              <span className="font-medium">Backup System Degradation</span>
                            </div>
                            <span className="text-sm text-muted-foreground">April 2, 2025</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            The backup system experienced reduced performance due to storage controller issues. Our team identified and resolved the issue by replacing faulty hardware.
                          </p>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 py-0.5 px-2 rounded-full">
                            Resolved
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportCenter;
