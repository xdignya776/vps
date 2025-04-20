
import React from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';

interface TwoFactorSetupProps {
  twoFactorSetupStep: 'idle' | 'qrcode' | 'verify' | 'complete';
  twoFactorCode: string;
  setTwoFactorCode: React.Dispatch<React.SetStateAction<string>>;
  verifyTwoFactorCode: () => void;
  cancelSetup: () => void;
}

const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  twoFactorSetupStep,
  twoFactorCode,
  setTwoFactorCode,
  verifyTwoFactorCode,
  cancelSetup
}) => {
  if (twoFactorSetupStep === 'idle') {
    return null;
  }
  
  if (twoFactorSetupStep === 'qrcode') {
    return (
      <div className="p-4 border rounded-lg space-y-4 bg-secondary/20">
        <h3 className="font-medium">Set up Two-Factor Authentication</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <QRCodeGenerator />
          <div className="flex-1">
            <p className="text-sm mb-2">1. Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
            <p className="text-sm mb-4">2. Enter the 6-digit code from the app below to verify</p>
            <div className="flex flex-col gap-2">
              <InputOTP maxLength={6} value={twoFactorCode} onChange={setTwoFactorCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <div className="flex gap-2 mt-2">
                <Button onClick={verifyTwoFactorCode}>Verify</Button>
                <Button 
                  variant="ghost" 
                  onClick={cancelSetup}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (twoFactorSetupStep === 'complete') {
    return (
      <div className="p-4 border rounded-lg flex items-start gap-2 bg-green-50">
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
        <div>
          <h3 className="font-medium text-green-800">Two-Factor Authentication Enabled</h3>
          <p className="text-sm text-green-600">Your account is now protected with an additional layer of security.</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default TwoFactorSetup;
