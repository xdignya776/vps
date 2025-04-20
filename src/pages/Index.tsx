
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import VpsPlans from '../components/home/VpsPlans';
import Testimonials from '../components/home/Testimonials';
import Cta from '../components/home/Cta';

const Index = () => {
  useEffect(() => {
    try {
      // Intersection Observer for animation on scroll
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
        
        animatedElements.forEach((element) => {
          observer.observe(element);
        });
        
        return () => {
          animatedElements.forEach((element) => {
            observer.unobserve(element);
          });
        };
      }
    } catch (error) {
      console.error('Error in Intersection Observer:', error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <VpsPlans />
        <Features />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
