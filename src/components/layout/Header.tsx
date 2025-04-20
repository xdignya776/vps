import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, UserCircle, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkUserLoggedIn = () => {
    const userEmail = localStorage.getItem('current_user_email');
    setIsLoggedIn(!!userEmail);
  };

  useEffect(() => {
    checkUserLoggedIn();
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    window.addEventListener('storage', checkUserLoggedIn);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUserLoggedIn);
    };
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const handleToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLeaseNow = () => {
    if (isLoggedIn) {
      navigate('/vps');
    } else {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to lease a VPS.",
        variant: "default"
      });
      navigate('/login');
    }
  };
  
  const handlePricing = () => {
    if (location.pathname === '/') {
      scrollToSection('pricing');
    } else {
      navigate('/pricing');
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || location.pathname !== '/' ? 
          "bg-background/80 backdrop-blur-md shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded">
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3Z" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 10H16" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 14H16" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 6V18" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-xl">DG Servers</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-sm hover:text-primary transition-colors">Features</button>
            <button onClick={() => scrollToSection('vps-plans')} className="text-sm hover:text-primary transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm hover:text-primary transition-colors">Testimonials</button>
            <Link to="/docs" className="text-sm hover:text-primary transition-colors">Documentation</Link>
            <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={handleToDashboard} className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Dashboard
              </Button>
              <Button onClick={handleToDashboard}>Account</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:inline-block">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 text-muted-foreground"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-background transform transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded">
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3Z" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 10H16" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 14H16" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 6V18" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-xl">DG Servers</span>
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-muted-foreground"
          >
            <X />
          </button>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <nav className="space-y-6">
            <button 
              onClick={() => scrollToSection('features')} 
              className="block w-full text-left py-2 text-lg"
            >
              Features
            </button>
            <button 
              onClick={handlePricing} 
              className="block w-full text-left py-2 text-lg"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="block w-full text-left py-2 text-lg"
            >
              Testimonials
            </button>
            <Link 
              to="/docs" 
              className="block py-2 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          
          <div className="pt-6 border-t border-border mt-6">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" className="w-full justify-start" onClick={() => {
                  setIsMenuOpen(false);
                  handleToDashboard();
                }}>
                  Dashboard
                </Button>
                <Link to="/settings" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Account</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
