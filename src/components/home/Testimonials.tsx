
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "DG Server's service has been revolutionary for our startup. The performance is outstanding and the support team responds within minutes.",
      author: "Emily Johnson",
      title: "CTO, TechNova",
      rating: 5
    },
    {
      quote: "We migrated from another provider and saw an immediate 40% improvement in load times. Couldn't be happier with the service.",
      author: "Michael Chen",
      title: "Lead Developer, DataFlow",
      rating: 5
    },
    {
      quote: "The scalability options have saved us countless times during traffic spikes. DG Server Hub handles everything flawlessly.",
      author: "Sarah Williams",
      title: "E-commerce Manager, ShopRight",
      rating: 5
    }
  ];

  const renderStars = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <Star key={index} className="h-4 w-4 text-dark-navy fill-dark-navy" />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-periwinkle/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-poppins">What Our Customers Say</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Join thousands of satisfied customers worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-periwinkle/20 rounded-xl p-6 border border-periwinkle/30 shadow-sm hover:shadow-pricing transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <div className="flex-1">
                  <svg width="36" height="28" className="mb-5 text-dark-navy/70" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 0C4.839 0 0 4.839 0 10.8C0 16.761 4.839 21.6 10.8 21.6C16.761 21.6 21.6 16.761 21.6 10.8C21.6 8.82 20.7 6.957 19.8 5.4L14.58 0H10.8ZM32.4 0C26.439 0 21.6 4.839 21.6 10.8C21.6 16.761 26.439 21.6 32.4 21.6C34.38 21.6 36 20.7 36 19.8L36 14.58V0H32.4Z" fill="currentColor"/>
                  </svg>
                  <p className="text-lg font-light text-foreground">{testimonial.quote}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-periwinkle/30">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-slate-blue">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
