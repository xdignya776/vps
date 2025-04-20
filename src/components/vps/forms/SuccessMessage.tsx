
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

const SuccessMessage: React.FC = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold">Purchase Complete!</h2>
          <p className="text-muted-foreground mt-2">
            Your VPS is being provisioned and will be ready shortly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessMessage;
