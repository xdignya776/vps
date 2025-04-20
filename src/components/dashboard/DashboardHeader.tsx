
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Server, 
  CreditCard, 
  Settings, 
  User, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    // Clear any stored user data or tokens
    localStorage.removeItem('current_user_email');
    
    // Redirect to login page
    navigate('/login');
  };
  
  const handleHomeClick = () => {
    // Navigate to home page without losing the authentication state
    navigate('/');
  };
  
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="p-0" onClick={handleHomeClick}>
              <Server className="h-5 w-5 mr-2 text-primary" />
              <span className="font-bold text-lg">DG Servers</span>
            </Button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className={`flex items-center text-sm hover:text-foreground transition-colors ${
                isActive('/dashboard') ? 'text-foreground font-medium' : 'text-foreground/80'
              }`}
            >
              <Home className="h-4 w-4 mr-1.5" />
              Dashboard
            </Link>
            <Link 
              to="/vps" 
              className={`flex items-center text-sm hover:text-foreground transition-colors ${
                isActive('/vps') ? 'text-foreground font-medium' : 'text-foreground/80'
              }`}
            >
              <Server className="h-4 w-4 mr-1.5" />
              VPS Plans
            </Link>
            <Link 
              to="/billing" 
              className={`flex items-center text-sm hover:text-foreground transition-colors ${
                isActive('/billing') ? 'text-foreground font-medium' : 'text-foreground/80'
              }`}
            >
              <CreditCard className="h-4 w-4 mr-1.5" />
              Billing
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center text-sm hover:text-foreground transition-colors ${
                isActive('/settings') ? 'text-foreground font-medium' : 'text-foreground/80'
              }`}
            >
              <Settings className="h-4 w-4 mr-1.5" />
              Settings
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleHomeClick} className="flex items-center">
              <Home className="h-4 w-4 mr-1.5" />
              Home
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/settings" className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                Account
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 z-50">
        <div className="flex justify-between items-center">
          <Link 
            to="/dashboard" 
            className={`flex flex-col items-center text-xs ${
              isActive('/dashboard') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            <Home className="h-5 w-5 mb-1" />
            Dashboard
          </Link>
          <Link 
            to="/vps" 
            className={`flex flex-col items-center text-xs ${
              isActive('/vps') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            <Server className="h-5 w-5 mb-1" />
            VPS
          </Link>
          <Link 
            to="/billing" 
            className={`flex flex-col items-center text-xs ${
              isActive('/billing') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            <CreditCard className="h-5 w-5 mb-1" />
            Billing
          </Link>
          <Link 
            to="/settings" 
            className={`flex flex-col items-center text-xs ${
              isActive('/settings') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            <Settings className="h-5 w-5 mb-1" />
            Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center text-xs text-foreground/80"
          >
            <LogOut className="h-5 w-5 mb-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
