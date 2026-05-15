import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';
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
            <button onClick={(e) => { e.preventDefault(); setModalType('privacy'); setModalOpen(true); }} className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Privacy Policy</button>
            <button onClick={(e) => { e.preventDefault(); setModalType('terms'); setModalOpen(true); }} className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Terms of Service</button>
            <button onClick={(e) => { e.preventDefault(); setModalType('cookie'); setModalOpen(true); }} className="text-sm text-arzens-text-muted hover:text-arzens-accent transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
      <CookiePolicyModal open={modalOpen} onClose={() => setModalOpen(false)} title={modalType === 'cookie' ? 'Cookie Policy' : modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}>
        {modalType === 'cookie' && (
          <div>
            <p>This Cookie Policy explains how THE ARZENS ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website at thearzens.tech (the "Website"). It explains what these technologies are, why we use them, and your rights to control our use of them.</p>

            <h3>1. What Are Cookies?</h3>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            <p>Cookies set by the website owner (in this case, THE ARZENS) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).</p>

            <h3>2. Why Do We Use Cookies?</h3>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>

            <h3>3. Types of Cookies We Use</h3>
            <h4>Strictly Necessary Cookies — Required</h4>
            <p>These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. Without these cookies, certain services cannot be provided.</p>
            <p><strong>Examples:</strong> Session cookies, Authentication cookies, Load balancing cookies</p>

            <h4>Performance Cookies — Optional</h4>
            <p>These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized.</p>
            <p><strong>Examples:</strong> Google Analytics, Page load time tracking, Error monitoring</p>

            <h4>Functionality Cookies — Optional</h4>
            <p>These cookies allow the website to remember choices you make and provide enhanced, more personal features. They may be set by us or by third-party providers whose services we have added to our pages.</p>
            <p><strong>Examples:</strong> Language preferences, Theme settings, Form auto-fill</p>

            <h4>Targeting/Advertising Cookies — Optional</h4>
            <p>These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.</p>
            <p><strong>Examples:</strong> Remarketing pixels, Social media pixels, Interest-based advertising</p>

            <h3>4. How Can You Control Cookies?</h3>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our Website.</p>

            <h3>5. How to Manage Cookies in Your Browser</h3>
            <p>Most browsers allow you to change your cookie preferences. The following links show how to adjust the cookie settings in popular browsers:</p>
            <ul>
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h3>6. Cookie Duration</h3>
            <p><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser.</p>
            <p><strong>Persistent Cookies:</strong> These cookies remain on your device for a longer period or until you manually delete them.</p>

            <h3>7. Third-Party Cookies</h3>
            <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Website, deliver advertisements on and through the Website, and so on. The third-party cookies we use include:</p>
            <ul>
              <li><strong>Google Analytics</strong> — Website traffic analysis and user behavior tracking</li>
              <li><strong>Cloudflare</strong> — Security, performance, and DNS services</li>
              <li><strong>LinkedIn</strong> — Social media integration and sharing</li>
            </ul>

            <h3>8. What We Don't Do With Cookies</h3>
            <ul>
              <li>We do not use cookies to collect personally identifiable information without your explicit consent</li>
              <li>We do not sell cookie data or browsing information to third parties</li>
              <li>We do not use cookies to access any information stored on your device beyond what is necessary for the functioning of our Website</li>
              <li>We do not use cookies for purposes that are incompatible with the purposes described in this policy</li>
            </ul>

            <h3>9. Updates to This Policy</h3>
            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. The date at the top of this Cookie Policy indicates when it was last updated.</p>

            <h3>10. Contact Us</h3>
            <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
            <p>
              THE ARZENS<br />
              Email: <a href="mailto:privacy@thearzens.tech" className="text-arzens-accent">privacy@thearzens.tech</a><br />
              Address: Pakistan<br />
              Phone: +92-329-5203738
            </p>

            <h3>Your Cookie Preferences</h3>
            <p>When you first visit our Website, you will see a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or customize your cookie preferences by category. You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of our Website or by clearing your browser cookies and revisiting the site.</p>
          </div>
        )}

        {modalType === 'privacy' && (
          <div>
            <p className="text-arzens-text-muted">Privacy Policy content is coming soon. For immediate questions, contact <a href="mailto:privacy@thearzens.tech" className="text-arzens-accent">privacy@thearzens.tech</a>.</p>
          </div>
        )}

        {modalType === 'terms' && (
          <div>
            <p className="text-arzens-text-muted">Terms of Service content is coming soon. For immediate questions, contact <a href="mailto:privacy@thearzens.tech" className="text-arzens-accent">privacy@thearzens.tech</a>.</p>
          </div>
        )}
      </CookiePolicyModal>
  );
}
