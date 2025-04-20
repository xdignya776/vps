
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Users, Globe, Heart, Award, Clock } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DG Servers</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Delivering high-performance, reliable hosting solutions since 2016. We're passionate about technology and committed to your success.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/documentation">Our Documentation</Link>
              </Button>
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2016 in Athens, Greece, DG Servers began with a simple mission: to provide high-quality hosting solutions that businesses could rely on.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  What started as a small team of passionate engineers has grown into a trusted provider serving thousands of clients across Europe and beyond. Through the years, we've maintained our commitment to excellence, transparency, and customer satisfaction.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we continue to evolve and expand our services, always focusing on reliability, performance, and exceptional support that our customers have come to expect.
                </p>
              </div>
              <div className="bg-muted/30 p-8 rounded-lg">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2">2016</h3>
                      <p className="text-muted-foreground">Founded in Athens with a focus on VPS hosting</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2">2018</h3>
                      <p className="text-muted-foreground">Expanded team and launched dedicated servers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2">2020</h3>
                      <p className="text-muted-foreground">Opened new data centers across Europe</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2">2023</h3>
                      <p className="text-muted-foreground">Awarded for best-in-class cloud infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-muted-foreground mb-12">
              These principles guide every decision we make and every service we provide
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Reliability</h3>
                  <p className="text-muted-foreground">
                    We build systems that you can depend on, 24/7/365, with industry-leading uptime guarantees.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Support</h3>
                  <p className="text-muted-foreground">
                    Our expert team is always available to help, with personalized support for every customer.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously improve our infrastructure and services to stay at the forefront of technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-muted h-64 rounded-lg mb-4"></div>
                <h3 className="text-xl font-medium">Dimitris Georgiou</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-64 rounded-lg mb-4"></div>
                <h3 className="text-xl font-medium">Maria Papadopoulos</h3>
                <p className="text-muted-foreground">Chief Technology Officer</p>
              </div>
              <div className="text-center">
                <div className="bg-muted h-64 rounded-lg mb-4"></div>
                <h3 className="text-xl font-medium">Andreas Nikolaou</h3>
                <p className="text-muted-foreground">Head of Customer Success</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-muted/30 p-8 md:p-12 rounded-lg text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thousands of businesses trust DG Servers for their hosting needs. 
              Experience our award-winning services and support today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/pricing">View Our Plans</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
