
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ActiveVPSInstances from '@/components/dashboard/ActiveVPSInstances';
import BillingSummary from '@/components/dashboard/BillingSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light-gray">
      <DashboardHeader />
      
      <main className="flex-grow">
        <div className="container mx-auto p-4 sm:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your VPS services.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="instances" className="space-y-4">
            <TabsList className="bg-white">
              <TabsTrigger value="instances">Instances</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="instances" className="space-y-4">
              <ActiveVPSInstances />
            </TabsContent>
            <TabsContent value="billing" className="space-y-4">
              <BillingSummary />
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-2">Settings Panel</h2>
                <p className="text-muted-foreground mb-4">
                  Configure your account settings, security options, and notification preferences.
                </p>
                <Button onClick={() => window.location.href = '/settings'}>
                  Go to Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
