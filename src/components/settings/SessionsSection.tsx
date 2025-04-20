
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface Session {
  id: number;
  device: string;
  browser: string;
  location: string;
  startTime: Date;
  isActive: boolean;
  isCurrent: boolean;
}

interface SessionsSectionProps {
  activeSessions: Session[];
  signOutSession: (sessionId: number) => void;
  signOutAllSessions: () => void;
}

const SessionsSection: React.FC<SessionsSectionProps> = ({ 
  activeSessions, 
  signOutSession, 
  signOutAllSessions 
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
      <div className="space-y-4">
        {activeSessions.map((session) => (
          <div key={session.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{session.device}</span>
              <span className="bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground">
              <span>{session.browser} • {session.location}</span>
              <span>Started {new Date(session.startTime).toLocaleTimeString()} {new Date(session.startTime).toLocaleDateString()}</span>
            </div>
            {!session.isCurrent && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => signOutSession(session.id)}
              >
                <X className="h-4 w-4 mr-1" />
                Sign Out This Device
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={signOutAllSessions}
      >
        Sign Out All Other Devices
      </Button>
    </div>
  );
};

export default SessionsSection;
