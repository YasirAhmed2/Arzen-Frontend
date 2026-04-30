import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Building2, Mic, Trophy, Calendar, Globe, BarChart3 } from 'lucide-react';
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

    const leftCard = cards.querySelector('.event-card-left');
    const rightCard = cards.querySelector('.event-card-right');

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

      gsap.fromTo(leftCard,
        { x: -60, opacity: 0, scale: 0.98 },
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

      gsap.fromTo(rightCard,
        { x: 60, opacity: 0, scale: 0.98 },
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
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          <div className="event-card-left group relative rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300">
            <div className="absolute inset-0">
              <img src="/hero-eagle.jpg" alt="Convention" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg via-arzens-bg/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-8">
              <div className="mb-6">
                <span className="label-mono text-arzens-accent">FLAGSHIP EVENT</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-arzens-text mt-2">
                  ARZENS Convention 2026
                </h3>
                <p className="text-arzens-text-muted mt-2">
                  The Cybersecurity Awakening
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">1000+</span>
                    <span className="text-xs text-arzens-text-muted">Participants</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">20+</span>
                    <span className="text-xs text-arzens-text-muted">Universities</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">10+</span>
                    <span className="text-xs text-arzens-text-muted">Industry Speakers</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">PKR 100K</span>
                    <span className="text-xs text-arzens-text-muted">CTF Prize Pool</span>
                  </div>
                </div>
              </div>

              <Button className="bg-arzens-accent hover:bg-arzens-accent/90 text-white font-mono type-scale-button uppercase tracking-wider">
                View Convention
              </Button>
            </div>
          </div>

          <div className="event-card-right group relative rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300">
            <div className="absolute inset-0">
              <img src="/hero-eagle.jpg" alt="CTF Arena" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity scale-x-[-1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg via-arzens-bg/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-8">
              <div className="mb-6">
                <span className="label-mono text-arzens-accent">WEEKLY COMPETITION</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-arzens-text mt-2">
                  CTF Arena
                </h3>
                <p className="text-arzens-text-muted mt-2">
                  Compete. Learn. Dominate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">Weekly</span>
                    <span className="text-xs text-arzens-text-muted">Challenges</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">Global</span>
                    <span className="text-xs text-arzens-text-muted">Leaderboard</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">All Levels</span>
                    <span className="text-xs text-arzens-text-muted">Beginner to Advanced</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-arzens-accent" />
                  <div>
                    <span className="block text-lg font-heading font-bold text-arzens-text">Rewards</span>
                    <span className="text-xs text-arzens-text-muted">Badges & Certificates</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 font-mono type-scale-button uppercase tracking-wider"
              >
                Enter Arena
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
