
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Testimonials from '../components/home/Testimonials';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Customer Testimonials</h1>
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
