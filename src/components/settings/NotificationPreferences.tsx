
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';

interface NotificationPreferencesProps {
  emailNotifications: boolean;
  setEmailNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  serverAlerts: boolean;
  setServerAlerts: React.Dispatch<React.SetStateAction<boolean>>;
  billingAlerts: boolean;
  setBillingAlerts: React.Dispatch<React.SetStateAction<boolean>>;
  marketingEmails: boolean;
  setMarketingEmails: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  emailNotifications,
  setEmailNotifications,
  serverAlerts,
  setServerAlerts,
  billingAlerts,
  setBillingAlerts,
  marketingEmails,
  setMarketingEmails
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Configure how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails for account updates and events
              </p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Server Status Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about uptime and performance issues
              </p>
            </div>
            <Switch 
              checked={serverAlerts}
              onCheckedChange={setServerAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Billing Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts about upcoming payments and billing issues
              </p>
            </div>
            <Switch 
              checked={billingAlerts}
              onCheckedChange={setBillingAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about new features and promotions
              </p>
            </div>
            <Switch 
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => toast({ title: "Preferences Saved", description: "Your notification preferences have been updated" })}>
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationPreferences;
