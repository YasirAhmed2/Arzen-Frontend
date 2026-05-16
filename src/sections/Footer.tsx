import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';
import { FaDiscord, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import CookiePolicyModal from '@/components/CookiePolicyModal';
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

const socialLinks = [
  { label: 'Discord', href: 'https://discord.gg/ccVwK3eDp', icon: FaDiscord, color: '#5865F2', hoverColor: '#4752C4' },
  { label: 'Instagram', href: 'https://www.instagram.com/the_arzens_official/', icon: FaInstagram, color: '#E4405F', hoverColor: '#C13584' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/the-arzens/?viewAsMember=true', icon: FaLinkedinIn, color: '#0A66C2', hoverColor: '#084591' },
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/FiQJ0MHgjvbI1ng9UcQ4O2', icon: FaWhatsapp, color: '#25D366', hoverColor: '#1EA855' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'cookie' | 'privacy' | 'terms' | null>(null);

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
    <>
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

        <div className="footer-column mb-12 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <span className="label-mono block mb-2">OFFICIAL SOCIALS</span>
              <p className="text-sm text-arzens-text-muted max-w-2xl">
                Follow The Arzens across our verified channels for updates, community drops, and official announcements.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open The Arzens ${social.label}`}
                    title={social.label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                    style={{
                      backgroundColor: social.color,
                      color: 'white',
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLAnchorElement;
                      target.style.backgroundColor = social.hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLAnchorElement;
                      target.style.backgroundColor = social.color;
                    }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-arzens-text-muted text-center md:text-left">
            &copy; 2026 The Arzens. All rights reserved. | Empowering Intelligence, Securing Tomorrow
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button onClick={(e) => { e.preventDefault(); setModalType('privacy'); setModalOpen(true); }} className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Privacy Policy</button>
            <button onClick={(e) => { e.preventDefault(); setModalType('terms'); setModalOpen(true); }} className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Terms of Service</button>
            <button onClick={(e) => { e.preventDefault(); setModalType('cookie'); setModalOpen(true); }} className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>

      <CookiePolicyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalType === 'cookie' ? 'Cookie Policy' : modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
      >
        {modalType === 'cookie' && (
          <div>
            <p>This Cookie Policy explains how THE ARZENS uses cookies and similar technologies to recognize you when you visit our website at thearzens.tech. It explains what these technologies are, why we use them, and how you can control them.</p>
            <h3>1. What Are Cookies?</h3>
            <p>Cookies are small data files placed on your device when you visit a website. They help websites work efficiently and provide reporting information.</p>
            <h3>2. Why Do We Use Cookies?</h3>
            <p>We use cookies for essential site functionality, performance analytics, and to improve the user experience.</p>
            <h3>3. How Can You Control Cookies?</h3>
            <p>You can manage cookies through your browser settings or by using the opt-out options provided on the Site.</p>
          </div>
        )}

        {modalType === 'privacy' && (
          <div>
            <h3>Privacy Policy</h3>
            <p>THE ARZENS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website thearzens.tech (the "Site") or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

            <h4>1. Information We Collect</h4>
            <p>We may collect personal data, derivative data, financial data, and mobile device data. This includes information you provide when registering, applying for internships, or becoming an ambassador, as well as information collected automatically when you use the Site.</p>

            <h4>2. Use of Your Information</h4>
            <p>We may use the information collected to manage accounts, process applications, communicate with you, improve the Site, prevent fraud, process payments, and support other business activities.</p>

            <h4>3. Disclosure of Your Information</h4>
            <p>We may share information when required by law, with service providers that help us operate the Site, for marketing communications with your consent, and in connection with user interactions where applicable.</p>

            <h4>4. Security of Your Information</h4>
            <p>We use administrative, technical, and physical safeguards to protect your personal information, including encryption, SSL technology, regular audits, and penetration testing.</p>

            <h4>5. Your Rights</h4>
            <p>You may have the right to access, correct, erase, restrict, object to, or request portability of your personal information, subject to applicable law.</p>

            <h4>6. Cookies and Tracking Technologies</h4>
            <p>We may use cookies, web beacons, tracking pixels, and similar technologies to improve your experience. You can manage cookies through your browser settings, although disabling them may affect functionality.</p>

            <h4>7. Data Retention</h4>
            <p>We retain personal data only as long as necessary to fulfill the purposes described in this policy and meet legal, accounting, and reporting requirements.</p>

            <h4>8. Children's Privacy</h4>
            <p>We do not knowingly solicit information from or market to children under 13. If you believe we have collected such information, please contact us.</p>

            <h4>9. Contact Us</h4>
            <p>If you have questions or comments about this Privacy Policy, contact THE ARZENS at <a href="mailto:privacy@thearzens.tech" className="text-arzens-accent">privacy@thearzens.tech</a> or +92-329-5203738. Address: Pakistan.</p>

            <h4>10. Changes to This Policy</h4>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page and, where appropriate, notified to you by email.</p>
          </div>
        )}

        {modalType === 'terms' && (
          <div>
            <h3>Terms of Service</h3>
            <p>These Terms of Service constitute a legally binding agreement between you and THE ARZENS concerning your access to and use of the thearzens.tech website and related services.</p>
            <h4>1. Intellectual Property Rights</h4>
            <p>The Services and all associated content are owned or controlled by us and are protected by copyright and trademark laws.</p>
            <h4>2. User Representations</h4>
            <p>By using the Services, you represent that your registration information is accurate, you have the legal capacity to comply with these Terms, and you will not use the Services for unlawful purposes.</p>
            <h4>3. Contact Us</h4>
            <p>For questions about these Terms, contact THE ARZENS at <a href="mailto:legal@thearzens.tech" className="text-arzens-accent">legal@thearzens.tech</a>.</p>
          </div>
        )}
      </CookiePolicyModal>
    </>
  );
}
