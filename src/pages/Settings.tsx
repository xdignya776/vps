
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Shield, Bell, UserCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileSection from "@/components/settings/ProfileSection";
import SecuritySection from "@/components/settings/SecuritySection";
import NotificationPreferences from "@/components/settings/NotificationPreferences";
import PasswordChangeModal from "@/components/settings/PasswordChangeModal";

const Settings = () => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [serverAlerts, setServerAlerts] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [twoFactorSetupStep, setTwoFactorSetupStep] = useState<'idle' | 'qrcode' | 'verify' | 'complete'>('idle');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Current Session', browser: 'Chrome', location: 'San Francisco, CA', startTime: new Date(Date.now() - 7200000), isActive: true, isCurrent: true },
    { id: 2, device: 'Mobile Device', browser: 'Safari Mobile', location: 'Athens, Greece', startTime: new Date(Date.now() - 86400000), isActive: true, isCurrent: false },
  ]);
  
  // Function to handle 2FA toggle
  const handleTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      // Start 2FA setup flow
      setTwoFactorSetupStep('qrcode');
      toast({
        title: "2FA Setup Started",
        description: "Follow the steps to enable two-factor authentication",
      });
    } else {
      // Confirm 2FA disable
      if (window.confirm("Are you sure you want to disable two-factor authentication? This will reduce your account security.")) {
        setTwoFactorAuth(false);
        setTwoFactorSetupStep('idle');
        toast({
          title: "2FA Disabled",
          description: "Two-factor authentication has been turned off",
          variant: "destructive"
        });
      }
    }
  };
  
  // Function to verify 2FA code
  const verifyTwoFactorCode = () => {
    // In a real app, this would validate against a proper 2FA system
    if (twoFactorCode.length === 6) {
      setTwoFactorAuth(true);
      setTwoFactorSetupStep('complete');
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled",
        variant: "default"
      });
      
      // Reset code after verification
      setTimeout(() => {
        setTwoFactorSetupStep('idle');
        setTwoFactorCode('');
      }, 3000);
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
    }
  };
  
  // Function to sign out a specific session
  const signOutSession = (sessionId: number) => {
    setActiveSessions(activeSessions.filter(session => session.id !== sessionId));
    toast({
      title: "Session Ended",
      description: "The selected session has been signed out",
    });
  };
  
  // Function to sign out all sessions
  const signOutAllSessions = () => {
    const currentSession = activeSessions.find(session => session.isCurrent);
    setActiveSessions(currentSession ? [currentSession] : []);
    toast({
      title: "All Sessions Ended",
      description: "All other devices have been signed out",
    });
  };
  
  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySection 
              twoFactorAuth={twoFactorAuth}
              handleTwoFactorToggle={handleTwoFactorToggle}
              twoFactorSetupStep={twoFactorSetupStep}
              twoFactorCode={twoFactorCode}
              setTwoFactorCode={setTwoFactorCode}
              verifyTwoFactorCode={verifyTwoFactorCode}
              activeSessions={activeSessions}
              signOutSession={signOutSession}
              signOutAllSessions={signOutAllSessions}
              onChangePassword={() => setPasswordModalOpen(true)}
            />
          </TabsContent>
          
          <TabsContent value="preferences">
            <NotificationPreferences
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
              serverAlerts={serverAlerts}
              setServerAlerts={setServerAlerts}
              billingAlerts={billingAlerts}
              setBillingAlerts={setBillingAlerts}
              marketingEmails={marketingEmails}
              setMarketingEmails={setMarketingEmails}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Password Change Modal */}
      <PasswordChangeModal 
        isOpen={passwordModalOpen} 
        onClose={() => setPasswordModalOpen(false)} 
      />
    </>
  );
};

export default Settings;
