
import React from 'react';
import { toast } from '@/hooks/use-toast';

const QRCodeGenerator: React.FC = () => {
  const generateRandomQRData = (): string => {
    // This would be replaced with actual 2FA QR code generation
    const size = 180;
    const darkColor = '000000';
    const lightColor = 'ffffff';
    const randomData = Math.random().toString(36).substring(2, 12);
    
    // Return a data URI for a QR code (placeholder)
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=otpauth://totp/DGServers:example@email.com?secret=${randomData}&issuer=DGServers&algorithm=SHA1&digits=6&period=30&color=${darkColor}&bgcolor=${lightColor}`;
  };
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <img 
        src={generateRandomQRData()} 
        alt="2FA QR Code" 
        className="w-32 h-32"
        onError={() => {
          toast({
            title: "Failed to load QR code",
            description: "Please try again or contact support",
            variant: "destructive"
          });
        }}
      />
    </div>
  );
};

export default QRCodeGenerator;
