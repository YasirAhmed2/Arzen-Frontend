import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { label: 'Web Development', href: '#services' },
  { label: 'Cybersecurity', href: '#services' },
  { label: 'Penetration Testing', href: '#services' },
  { label: 'Digital Forensics', href: '#services' },
  { label: 'CTF Events', href: '#events' },
  { label: 'IT Consulting', href: '#services' },
];

const programs = [
  { label: 'Events', href: '/events', externalPage: true },
  { label: 'Team', href: '#team' },
  { label: 'Services', href: '#services' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const columnElements = footer.querySelectorAll('.footer-column');

    const ctx = gsap.context(() => {
      gsap.fromTo(columnElements,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="relative w-full py-16 md:py-20 bg-arzens-bg border-t border-white/10">
      <div className="px-[6vw]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <div className="footer-column">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="THE ARZENS" className="w-10 h-10" />
              <div>
                <span className="block text-xl font-heading font-bold text-arzens-text">THE ARZENS</span>
                <span className="label-mono">ELITE CYBERSECURITY</span>
              </div>
            </a>
            <p className="text-arzens-text-muted max-w-sm">
              Empowering Intelligence, Securing Tomorrow. The #1 platform to build attack-ready teams and secure digital assets.
            </p>
          </div>

          <div className="footer-column w-full lg:w-auto">
            <span className="label-mono block mb-3">SUBSCRIBE TO OUR NEWSLETTER</span>
            <p className="text-sm text-arzens-text-muted mb-4">
              Get the latest updates on cybersecurity trends and events.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-arzens-bg-secondary border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent w-full lg:w-64"
                required
              />
              <Button type="submit" className="bg-arzens-accent hover:bg-arzens-accent/90 text-white px-4">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="footer-column">
            <span className="label-mono block mb-4">QUICK LINKS</span>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-arzens-text-muted hover:text-arzens-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <span className="label-mono block mb-4">OUR SERVICES</span>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} onClick={(e) => { e.preventDefault(); scrollToSection(service.href); }} className="text-arzens-text-muted hover:text-arzens-accent transition-colors text-sm">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <span className="label-mono block mb-4">PROGRAMS</span>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (program.externalPage) {
                        window.location.href = program.href;
                        return;
                      }
                      scrollToSection(program.href);
                    }}
                    className="text-arzens-text-muted hover:text-arzens-accent transition-colors text-sm"
                  >
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <span className="label-mono block mb-4">CONTACT INFO</span>
            <ul className="space-y-3">
              <li>
                <span className="label-mono block text-xs mb-1">EMAIL</span>
                <a href="mailto:info@thearzens.tech" className="text-arzens-text-muted hover:text-arzens-accent transition-colors text-sm">
                  info@thearzens.tech
                </a>
              </li>
              <li>
                <span className="label-mono block text-xs mb-1">PHONE</span>
                <a href="tel:+923295203738" className="text-arzens-text-muted hover:text-arzens-accent transition-colors text-sm">
                  +92-329-5203738
                </a>
              </li>
              <li>
                <span className="label-mono block text-xs mb-1">LOCATION</span>
                <span className="text-arzens-text-muted text-sm">Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-arzens-text-muted text-center md:text-left">
            &copy; 2026 The Arzens. All rights reserved. | Empowering Intelligence, Securing Tomorrow
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
