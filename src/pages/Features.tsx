
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Shield, 
  Server, 
  HardDrive, 
  Zap, 
  BarChart, 
  Lock, 
  Wifi,
  Code,
  GitBranch,
  Terminal,
  Database,
  FileText,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: <Server className="h-10 w-10 text-blue-500" />,
      title: 'High-Performance CPUs',
      description: 'Dedicated CPU resources ensure your applications run smoothly at all times.'
    },
    {
      icon: <HardDrive className="h-10 w-10 text-blue-500" />,
      title: 'SSD Storage',
      description: 'Lightning-fast SSD storage for quick data access and application loading.'
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: 'Instant Scaling',
      description: 'Scale your resources up or down with just a few clicks as your needs change.'
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with DDoS protection and regular security updates.'
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: '99.9% Uptime',
      description: 'We guarantee reliable service with our 99.9% uptime SLA.'
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
      title: 'Detailed Analytics',
      description: 'Monitor your server performance with our comprehensive analytics dashboard.'
    }
  ];

  const webHostingFeatures = [
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'One-Click WordPress Installation',
      description: 'Deploy WordPress sites instantly with our automated installer.'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: 'Advanced Server Caching',
      description: 'Improve site performance with built-in caching technologies.'
    },
    {
      icon: <Server className="h-8 w-8 text-blue-500" />,
      title: 'LiteSpeed Web Server Support',
      description: 'Enjoy optimized performance with LiteSpeed web server technology.'
    },
  ];

  const developerFeatures = [
    {
      icon: <GitBranch className="h-8 w-8 text-blue-500" />,
      title: 'Git Deployment',
      description: 'Deploy directly from your Git repositories with automated workflows.'
    },
    {
      icon: <Terminal className="h-8 w-8 text-blue-500" />,
      title: 'SSH Access',
      description: 'Full shell access for complete control over your server environment.'
    },
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: 'Composer & NPM Support',
      description: 'Built-in support for PHP and JavaScript package managers.'
    },
  ];

  const securityFeatures = [
    {
      icon: <Lock className="h-8 w-8 text-blue-500" />,
      title: 'Free SSL Certificates',
      description: 'Secure your sites with free SSL certificates through Let\'s Encrypt integration.'
    },
    {
      icon: <Database className="h-8 w-8 text-blue-500" />,
      title: 'Automatic Backups',
      description: 'Daily and weekly automated backups to keep your data safe.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: 'Server-Level Firewall',
      description: 'Advanced firewall protection against unauthorized access and attacks.'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Our Features</h1>
          
          {/* Main Features Section */}
          <section className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core VPS Features</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Powerful cloud infrastructure designed for reliability and performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {mainFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-feature hover:shadow-pricing transition-all duration-300"
                >
                  <div className="flex flex-col items-start">
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Detailed Feature Categories */}
          <section className="py-12 bg-gray-50 rounded-xl mt-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive Hosting Solutions</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Every VPS lease includes our full suite of web hosting and developer tools
              </p>
            </div>
            
            {/* Web Hosting Features */}
            <div className="max-w-6xl mx-auto mb-16">
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-blue-500">Web Hosting Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {webHostingFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col items-start">
                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Developer Tools */}
            <div className="max-w-6xl mx-auto mb-16">
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-green-500">Developer Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {developerFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col items-start">
                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        {feature.icon.type && React.cloneElement(feature.icon, { className: "h-8 w-8 text-green-500" })}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Security & Management */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-purple-500">Security & Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {securityFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col items-start">
                      <div className="bg-purple-50 p-3 rounded-lg mb-4">
                        {feature.icon.type && React.cloneElement(feature.icon, { className: "h-8 w-8 text-purple-500" })}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Free Services Section */}
          <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Free Services Included</h2>
                <p className="mt-4 text-blue-100">
                  Everything you need for your cloud infrastructure at no additional cost
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Lock className="h-12 w-12 p-2 rounded-full bg-blue-50 text-blue-500" />,
                    title: 'SSL Certificates',
                    description: 'Free SSL certificates for all your domains with our Let\'s Encrypt integration.'
                  },
                  {
                    icon: <HardDrive className="h-12 w-12 p-2 rounded-full bg-blue-50 text-blue-500" />,
                    title: 'Backup Snapshots',
                    description: 'Daily and weekly automated backups included with every plan.'
                  },
                  {
                    icon: <Server className="h-12 w-12 p-2 rounded-full bg-blue-50 text-blue-500" />,
                    title: 'Control Panel',
                    description: 'Advanced control panel included at no extra charge.'
                  },
                  {
                    icon: <Wifi className="h-12 w-12 p-2 rounded-full bg-blue-50 text-blue-500" />,
                    title: 'API Access',
                    description: 'Fully-featured API for automation and integration with your workflows.'
                  }
                ].map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="flex flex-col items-center text-center">
                      {service.icon}
                      <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                      <p className="mt-2 text-blue-100">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 text-center mt-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Experience Our VPS Features?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Start with a high-performance VPS solution today and experience all these features firsthand.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/pricing">View Pricing Plans</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
