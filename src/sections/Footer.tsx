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
            <h3>Terms of Service</h3>
            <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you ("you," "your," or "User") and THE ARZENS ("we," "us," or "Company"), concerning your access to and use of the thearzens.tech website and any related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with all of these Terms, then you are expressly prohibited from using the Services and must discontinue use immediately.</p>

            <h4>1. Intellectual Property Rights</h4>
            <p>Unless otherwise indicated, the Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Services (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.</p>
            <p>The Content and Marks are provided on the Services "AS IS" for your information and personal use only. Except as expressly provided in these Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
            <p>Provided that you are eligible to use the Services, you are granted a limited license to access and use the Services and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>

            <h4>2. User Representations</h4>
            <p>By using the Services, you represent and warrant that:</p>
            <ul>
              <li>All registration information you submit will be true, accurate, current, and complete</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
              <li>You have the legal capacity and you agree to comply with these Terms</li>
              <li>You are not a minor in the jurisdiction in which you reside</li>
              <li>You will not access the Services through automated or non-human means</li>
              <li>You will not use the Services for any illegal or unauthorized purpose</li>
              <li>Your use of the Services will not violate any applicable law or regulation</li>
            </ul>

            <h4>3. User Registration</h4>
            <p>You may be required to register with the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
            <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Services or a third-party service.</p>

            <h4>4. Prohibited Activities</h4>
            <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Services, you agree not to:</p>
            <ul>
              <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
              <li>Engage in unauthorized framing of or linking to the Services</li>
              <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
              <li>Delete the copyright or other proprietary rights notice from any Content</li>
              <li>Attempt to impersonate another user or person or use the username of another user</li>
              <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism</li>
              <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services</li>
              <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you</li>
              <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services</li>
              <li>Copy or adapt the Services software, including but not limited to Flash, PHP, HTML, JavaScript, or other code</li>
            </ul>

            <h4>5. Services Management</h4>
            <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>

            <h4>6. Privacy Policy</h4>
            <p>We care about data privacy and security. Please review our Privacy Policy. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Terms. Please be advised the Services are hosted in Pakistan. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Pakistan, then through your continued use of the Services, you are transferring your data to Pakistan, and you expressly consent to have your data transferred to and processed in Pakistan.</p>

            <h4>7. Modifications and Interruptions</h4>
            <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services. We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you.</p>

            <h4>8. Governing Law</h4>
            <p>These Terms shall be governed by and defined following the laws of Pakistan. THE ARZENS and yourself irrevocably consent that the courts of Pakistan shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Terms.</p>

            <h4>9. Dispute Resolution</h4>
            <p>You agree to irrevocably submit all disputes related to these Terms or the legal relationship established by these Terms to the jurisdiction of the Pakistan courts. THE ARZENS shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Terms are entered into in the course of your trade or profession, the country of your principal place of business.</p>

            <h4>10. Limitation of Liability</h4>
            <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Services, even if we have been advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six (6) month period prior to any cause of action arising.</p>

            <h4>11. Disclaimer</h4>
            <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT.</p>

            <h4>12. Contact Us</h4>
            <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
            <p>
              THE ARZENS<br />
              Email: <a href="mailto:legal@thearzens.tech" className="text-arzens-accent">legal@thearzens.tech</a><br />
              Address: Pakistan<br />
              Phone: +92-329-5203738
            </p>
          </div>
        )}
      </CookiePolicyModal>
  );
}
