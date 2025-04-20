
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Server, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pb-20 lg:pb-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            High-Performance <span className="text-primary/90">VPS</span> Hosting
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-primary/80 animate-fade-in delay-100">
            Deploy and scale your applications instantly with our reliable and secure virtual private servers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in delay-200">
            <Link to="/login">
              <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary/90">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-primary py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center animate-fade-in-up">
              <Server className="h-8 w-8 text-white mb-2" />
              <h3 className="font-medium text-xl text-white">Simple</h3>
              <p className="text-white/90">Deploy in minutes</p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-100">
              <Zap className="h-8 w-8 text-white mb-2" />
              <h3 className="font-medium text-xl text-white">Scalable</h3>
              <p className="text-white/90">Grow as you need</p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-200">
              <Shield className="h-8 w-8 text-white mb-2" />
              <h3 className="font-medium text-xl text-white">Secure</h3>
              <p className="text-white/90">Enterprise protection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
