
import React from 'react';
import { Clock, Shield, Cpu, HardDrive, Zap, BarChart, Award, Wifi, Server, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <Server className="h-10 w-10 text-teal" />,
      title: 'High-Performance CPUs',
      description: 'Dedicated CPU resources ensure your applications run smoothly at all times.'
    },
    {
      icon: <HardDrive className="h-10 w-10 text-teal" />,
      title: 'SSD Storage',
      description: 'Lightning-fast SSD storage for quick data access and application loading.'
    },
    {
      icon: <Zap className="h-10 w-10 text-teal" />,
      title: 'Instant Scaling',
      description: 'Scale your resources up or down with just a few clicks as your needs change.'
    },
    {
      icon: <Shield className="h-10 w-10 text-teal" />,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with DDoS protection and regular security updates.'
    },
    {
      icon: <Clock className="h-10 w-10 text-teal" />,
      title: '99.9% Uptime',
      description: 'We guarantee reliable service with our 99.9% uptime SLA.'
    },
    {
      icon: <BarChart className="h-10 w-10 text-teal" />,
      title: 'Detailed Analytics',
      description: 'Monitor your server performance with our comprehensive analytics dashboard.'
    }
  ];

  const includedServices = [
    {
      icon: <Lock className="h-12 w-12 p-2 rounded-full bg-teal/10 text-teal" />,
      title: 'SSL Certificates',
      description: 'Free SSL certificates for all your domains with our Let\'s Encrypt integration.'
    },
    {
      icon: <HardDrive className="h-12 w-12 p-2 rounded-full bg-teal/10 text-teal" />,
      title: 'Backup Snapshots',
      description: 'Daily and weekly automated backups included with every plan.'
    },
    {
      icon: <Server className="h-12 w-12 p-2 rounded-full bg-teal/10 text-teal" />,
      title: 'Control Panel',
      description: 'Advanced control panel included at no extra charge.'
    },
    {
      icon: <Wifi className="h-12 w-12 p-2 rounded-full bg-teal/10 text-teal" />,
      title: 'API Access',
      description: 'Fully-featured API for automation and integration with your workflows.'
    }
  ];

  return (
    <>
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-poppins">Feature Packed Cloud</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Simple. Scalable. Feature Packed Cloud
            </p>
            <p className="mt-2 text-olive">
              Try an easy but infinitely flexible and effective Cloud designed for Teams, built for Developers, usable by Novices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/50 rounded-xl p-6 border border-secondary shadow-feature hover:shadow-pricing transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-start">
                  <div className="bg-teal/10 p-3 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold font-poppins">{feature.title}</h3>
                  <p className="mt-2 text-olive">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-10 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-poppins">Free Services Included</h2>
            <p className="mt-4 text-white/90">
              Everything you need for your cloud infrastructure at no additional cost
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includedServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="mt-4 text-xl font-semibold font-poppins">{service.title}</h3>
                  <p className="mt-2 text-white/90">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/features">
              <Button size="lg" className="bg-white text-teal hover:bg-white/90">
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
