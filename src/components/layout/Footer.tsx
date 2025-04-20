import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              DG Servers
            </Link>
            <p className="text-muted-foreground">
              High-performance cloud hosting solutions for modern applications and websites.
            </p>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/Support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help & Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Company Info</h4>
            <div className="text-sm text-muted-foreground mt-4">
              <p>DG Servers ΜΟΝΟΠΡΟΣΩΠΗ ΙΔΙΩΤΙΚΗ ΚΕΦΑΛΑΙΟΥΧΙΚΗ ΕΤΑΙΡΕΙΑ</p>
              <p>Αρ. ΓΕΜΗ 183713421000</p>
              <p>Α.Φ.Μ. 802839153</p>
              <p className="mt-2">Phone: +30 6978861518</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DG Servers ΜΙΚΕ. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
