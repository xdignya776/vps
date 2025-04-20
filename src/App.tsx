import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import VPS from "./pages/VPS";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import FeaturesPage from "./pages/Features";
import PricingPage from "./pages/PricingPage";
import TestimonialsPage from "./pages/Testimonials";
import VPSPurchasePage from "./pages/VPSPurchasePage";
import VPSConsolePage from "./pages/VPSConsolePage";
import ServerManagementPage from "./pages/ServerManagementPage";
import Login from "./pages/Login";
import DocsPage from "./pages/Blog";
import ArticlePage from "./pages/blog/ArticlePage";
import Documentation from "./pages/Documentation";
import SupportCenter from "./pages/SupportCenter";
import AboutUs from "./pages/AboutUs";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Smooth scroll to hash element
const ScrollToHashElement = () => {
  const { hash } = window.location;
  
  useEffect(() => {
    try {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.error('Error scrolling to hash element:', error);
    }
  }, [hash]);
  
  return null;
};

// Auth guard component
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('current_user_email');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToHashElement />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<ArticlePage />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/support" element={<SupportCenter />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Redirects from old blog URLs to docs */}
          <Route path="/blog" element={<Navigate to="/docs" replace />} />
          <Route path="/blog/:slug" element={<Navigate to="/docs/:slug" replace />} />
          
          {/* Documentation article routes matching the blue links in the image */}
          <Route path="/documentation/account-creation" element={<Navigate to="/docs/creating-your-account" replace />} />
          <Route path="/documentation/choosing-plan" element={<Navigate to="/docs/choosing-the-right-plan" replace />} />
          <Route path="/documentation/first-deployment" element={<Navigate to="/docs/deploying-your-first-vps" replace />} />
          <Route path="/documentation/control-panel" element={<Navigate to="/docs/using-the-control-panel" replace />} />
          <Route path="/documentation/server-restart" element={<Navigate to="/docs/rebooting-power-options" replace />} />
          <Route path="/documentation/backup-restore" element={<Navigate to="/docs/backup-restore" replace />} />
          <Route path="/documentation/ssh-security" element={<Navigate to="/docs/ssh-keys-security" replace />} />
          <Route path="/documentation/firewall-setup" element={<Navigate to="/docs/firewall-configuration" replace />} />
          <Route path="/documentation/security-updates" element={<Navigate to="/docs/keeping-your-server-updated" replace />} />
          <Route path="/documentation/mysql-setup" element={<Navigate to="/docs/mysql-mariadb-setup" replace />} />
          <Route path="/documentation/postgresql-setup" element={<Navigate to="/docs/postgresql-configuration" replace />} />
          <Route path="/documentation/database-backup" element={<Navigate to="/docs/database-backup-strategies" replace />} />
          <Route path="/documentation/basic-commands" element={<Navigate to="/docs/basic-linux-commands" replace />} />
          <Route path="/documentation/file-management" element={<Navigate to="/docs/file-system-management" replace />} />
          <Route path="/documentation/process-management" element={<Navigate to="/docs/process-management" replace />} />
          <Route path="/documentation/nginx-setup" element={<Navigate to="/docs/nginx-configuration" replace />} />
          <Route path="/documentation/apache-setup" element={<Navigate to="/docs/apache-setup" replace />} />
          <Route path="/documentation/ssl-certificates" element={<Navigate to="/docs/ssl-certificates" replace />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/vps" element={
            <AuthGuard>
              <VPS />
            </AuthGuard>
          } />
          <Route path="/vps/purchase" element={
            <AuthGuard>
              <VPSPurchasePage />
            </AuthGuard>
          } />
          <Route path="/vps/console" element={
            <AuthGuard>
              <VPSConsolePage />
            </AuthGuard>
          } />
          <Route path="/server-management" element={
            <AuthGuard>
              <ServerManagementPage />
            </AuthGuard>
          } />
          <Route path="/billing" element={
            <AuthGuard>
              <Billing />
            </AuthGuard>
          } />
          <Route path="/settings" element={
            <AuthGuard>
              <Settings />
            </AuthGuard>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
