
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

const Contact = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('current_user_email');
    setIsLoggedIn(!!userEmail);
  }, []);

  return (
    <>
      {isLoggedIn ? <DashboardHeader /> : <Header />}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Contact Sales</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form and our team will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          
          <ContactInfo />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
