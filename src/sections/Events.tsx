import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Calendar, Globe, BarChart3, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const eventCards = cards.querySelectorAll('.event-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );

      eventCards.forEach((card, index) => {
        const offset = (index - 1) * 60;
        gsap.fromTo(card,
          { x: offset, opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cards,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 0.4,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-arzens-bg-secondary"
    >
      <div className="px-[6vw]">
        <div ref={headerRef} className="mb-12 md:mb-16 text-center">
          <span className="label-mono block mb-4">EVENTS & CTFs</span>
          <h2 className="type-scale-section-title font-heading font-bold text-arzens-text">
            Join the <span className="text-gradient">Movement</span>
          </h2>
          <p className="mt-4 type-scale-body text-arzens-text-muted max-w-2xl mx-auto">
            Participate in our flagship convention and weekly CTF competitions to sharpen your skills.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 md:gap-6"
        >
          {/* Air Hackathon */}
          <div className="event-card group relative rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300 cursor-pointer" onClick={() => window.open('https://forms.gle/VtPUBCBJzJRVCa1L6', '_blank')}>
            <div className="absolute inset-0">
              <img src="/hero.jpeg" alt="Air Hackathon" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg via-arzens-bg/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-6 h-full flex flex-col justify-between">
              <div className="mb-4">
                <span className="label-mono text-arzens-accent">HACKATHON</span>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-arzens-text mt-2">
                  Air Hackathon
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-arzens-text-muted">
                  <MapPin className="w-4 h-4 text-arzens-accent" />
                  <span>Air University Islamabad</span>
                </div>
              </div>

              <Button 
                className="bg-arzens-accent hover:bg-arzens-accent/90 text-white font-mono type-scale-button uppercase tracking-wider w-full flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://forms.gle/VtPUBCBJzJRVCa1L6', '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Register Now
              </Button>
            </div>
          </div>

          {/* BlackByt3 Convention */}
          <div className="event-card group relative rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300 cursor-pointer" onClick={() => window.open('https://tally.so/r/XxYKGj', '_blank')}>
            <div className="absolute inset-0">
              <img src="/hero.jpeg" alt="BlackByt3 Convention" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg via-arzens-bg/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-6 h-full flex flex-col justify-between">
              <div className="mb-4">
                <span className="label-mono text-arzens-accent">CTF COMPETITION</span>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-arzens-text mt-2">
                  BlackByt3 Convention
                </h3>
                <p className="text-arzens-text-muted mt-2 text-sm">
                  Online CTF Challenge
                </p>
              </div>

              <div className="space-y-2 mb-4 text-xs text-arzens-text-muted">
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span className="font-heading">PKR 1600</span>
                </div>
                <div className="flex justify-between">
                  <span>Prize Pool:</span>
                  <span className="font-heading">PKR 70,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Promo Code:</span>
                  <span className="font-heading text-arzens-accent">THE ARZENS</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-heading">Rs. 600 OFF</span>
                </div>
              </div>

              <Button 
                className="bg-arzens-accent hover:bg-arzens-accent/90 text-white font-mono type-scale-button uppercase tracking-wider w-full flex items-center justify-center gap-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://tally.so/r/XxYKGj', '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Register CTF
              </Button>
            </div>
          </div>

          {/* KheloCTF */}
          <div className="event-card group relative rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300 cursor-pointer" onClick={() => window.open('https://www.kheloctf.com', '_blank')}>
            <div className="absolute inset-0">
              <img src="/hero.jpeg" alt="KheloCTF" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg via-arzens-bg/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-6 h-full flex flex-col justify-between">
              <div className="mb-4">
                <span className="label-mono text-arzens-accent">GLOBAL CTF</span>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-arzens-text mt-2">
                  KheloCTF
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-arzens-text-muted">
                  <Globe className="w-4 h-4 text-arzens-accent" />
                  <span>Held Online</span>
                </div>
              </div>

              <Button 
                className="bg-arzens-accent hover:bg-arzens-accent/90 text-white font-mono type-scale-button uppercase tracking-wider w-full flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.kheloctf.com', '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
