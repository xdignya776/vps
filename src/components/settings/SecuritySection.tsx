
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import SessionsSection from './SessionsSection';
import TwoFactorSetup from './TwoFactorSetup';

interface SecuritySectionProps {
  twoFactorAuth: boolean;
  handleTwoFactorToggle: (checked: boolean) => void;
  twoFactorSetupStep: 'idle' | 'qrcode' | 'verify' | 'complete';
  twoFactorCode: string;
  setTwoFactorCode: React.Dispatch<React.SetStateAction<string>>;
  verifyTwoFactorCode: () => void;
  activeSessions: Array<{
    id: number;
    device: string;
    browser: string;
    location: string;
    startTime: Date;
    isActive: boolean;
    isCurrent: boolean;
  }>;
  signOutSession: (sessionId: number) => void;
  signOutAllSessions: () => void;
  onChangePassword: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  twoFactorAuth,
  handleTwoFactorToggle,
  twoFactorSetupStep,
  twoFactorCode,
  setTwoFactorCode,
  verifyTwoFactorCode,
  activeSessions,
  signOutSession,
  signOutAllSessions,
  onChangePassword
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and authentication options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Password</Label>
              <p className="text-sm text-muted-foreground">
                Change your account password
              </p>
            </div>
            <Button variant="outline" onClick={onChangePassword}>Change Password</Button>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Label className="text-base">Two Factor Authentication</Label>
                  <span className="bg-yellow-500/20 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">Recommended</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="two-factor" 
                  checked={twoFactorAuth}
                  onCheckedChange={handleTwoFactorToggle}
                />
                <span>{twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
            
            <TwoFactorSetup
              twoFactorSetupStep={twoFactorSetupStep}
              twoFactorCode={twoFactorCode}
              setTwoFactorCode={setTwoFactorCode}
              verifyTwoFactorCode={verifyTwoFactorCode}
              cancelSetup={() => setTwoFactorCode('')}
            />
          </div>
          
          <Separator />
          
          <SessionsSection 
            activeSessions={activeSessions}
            signOutSession={signOutSession}
            signOutAllSessions={signOutAllSessions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
