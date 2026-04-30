import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Events', href: '/events', externalPage: true },
  { label: 'Ambassador', href: '/ambassador', externalPage: true },
  { label: 'Internships', href: '/internships', externalPage: true },
  { label: 'Admin', href: '/admin', externalPage: true },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string, externalPage?: boolean) => {
    if (externalPage) {
      window.location.href = href;
      return;
    }

    if (window.location.pathname !== '/' && href.startsWith('#')) {
      window.location.href = `/${href}`;
      return;
    }

    scrollToSection(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-arzens-bg/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="px-[4vw] py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3"
          >
            <img src="/logo.png" alt="THE ARZENS" className="w-8 h-8" />
            <div className="hidden sm:block">
              <span className="block text-lg font-heading font-bold text-arzens-text leading-none">THE ARZENS</span>
              <span className="label-mono text-[10px]">ELITE CYBERSECURITY</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.externalPage);
                }}
                className="text-sm text-arzens-text-muted hover:text-arzens-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-arzens-accent hover:bg-arzens-accent/90 text-arzens-text font-mono text-xs uppercase tracking-wider"
            >
              <a
                href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              >
                Get Started
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-arzens-text"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-arzens-bg/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href, link.externalPage);
              }}
              className="text-2xl font-heading font-semibold text-arzens-text hover:text-arzens-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-4 bg-arzens-accent hover:bg-arzens-accent/90 text-arzens-text font-mono text-sm uppercase tracking-wider px-8 py-6">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
            >
              Get Started
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
