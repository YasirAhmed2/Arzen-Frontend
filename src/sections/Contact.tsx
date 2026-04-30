import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !form || !info) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(form,
        { x: -70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );

      gsap.fromTo(info,
        { x: 70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message transmitted! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-arzens-bg-secondary"
    >
      <div className="px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div ref={formRef}>
            <span className="label-mono block mb-4">ESTABLISH UPLINK</span>
            <h2 className="type-scale-section-title font-heading font-bold text-arzens-text mb-4">
              Ready to Secure Your <span className="text-gradient">Digital Future?</span>
            </h2>
            <p className="type-scale-body text-arzens-text-muted mb-8">
              Don't wait for a breach. Let The Arzens be your trusted partner in digital defense.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label-mono block mb-2 text-arzens-text">NAME:</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent focus:ring-arzens-accent/20"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="label-mono block mb-2 text-arzens-text">EMAIL:</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent focus:ring-arzens-accent/20"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="label-mono block mb-2 text-arzens-text">MESSAGE:</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent focus:ring-arzens-accent/20 min-h-[120px]"
                  placeholder="Enter your message"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-arzens-accent hover:bg-arzens-accent/90 text-white font-mono type-scale-button uppercase tracking-wider px-8 py-6 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-arzens-accent/30"
              >
                <Send className="w-4 h-4 mr-2" />
                Transmit
              </Button>
            </form>
          </div>

          <div ref={infoRef} className="lg:pl-8">
            <div className="bg-arzens-bg rounded-lg p-5 sm:p-8 border border-white/10">
              <h3 className="text-xl font-heading font-semibold text-arzens-text mb-6">
                Direct Channels
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-arzens-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-arzens-accent" />
                  </div>
                  <div>
                    <span className="label-mono block mb-1">CALL US</span>
                    <a
                      href="tel:+923295203738"
                      className="text-arzens-text hover:text-arzens-accent transition-colors"
                    >
                      +92-329-5203738
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-arzens-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-arzens-accent" />
                  </div>
                  <div>
                    <span className="label-mono block mb-1">EMAIL US</span>
                    <a
                      href="mailto:info@thearzens.tech"
                      className="text-arzens-text hover:text-arzens-accent transition-colors"
                    >
                      info@thearzens.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-arzens-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-arzens-accent" />
                  </div>
                  <div>
                    <span className="label-mono block mb-1">VISIT US</span>
                    <span className="text-arzens-text">Pakistan</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-arzens-text-muted">
                    Systems operational. Response time: &lt; 24 hours.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
