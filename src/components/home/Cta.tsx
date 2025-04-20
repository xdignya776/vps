
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';

const Cta = () => {
  return (
    <section id="cta" className="py-20 bg-secondary/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center animate-on-scroll">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-poppins">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-white/90">
            Deploy your VPS in minutes and experience the difference.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-teal hover:bg-white/90">
                Start Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal hover:bg-white/90">
                <MessageSquare className="h-4 w-4" /> Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
