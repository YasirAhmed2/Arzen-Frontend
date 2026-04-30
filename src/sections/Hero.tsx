import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Terminal, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const stats = statsRef.current;
    const microcopy = microcopyRef.current;
    const bg = bgRef.current;

    if (!section || !headline || !subheadline || !cta || !stats || !microcopy || !bg) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl.fromTo(
        bg,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      const wakingChars = headline.querySelectorAll('.waking-char');
      const upChars = headline.querySelectorAll('.up-char');
      const label = headline.querySelector('.hero-label');

      loadTl.fromTo(label, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.6');
      loadTl.fromTo(wakingChars, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.02 }, '-=0.4');
      loadTl.fromTo(upChars, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.02 }, '-=0.5');
      loadTl.fromTo(subheadline, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5');
      loadTl.fromTo(cta, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.3');
      loadTl.fromTo(stats, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
      loadTl.fromTo(microcopy, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          onLeaveBack: () => {
            gsap.set([headline, subheadline, cta, stats, microcopy], { opacity: 1, x: 0, y: 0 });
            gsap.set(bg, { opacity: 1, scale: 1 });
          },
        },
      });

      scrollTl.fromTo(headline, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(subheadline, { x: 0, opacity: 1 }, { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(cta, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(stats, { y: 0, opacity: 1 }, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(microcopy, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      scrollTl.fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 0.65, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const wakingText = 'WAKING';
  const upText = 'UP';

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img src="/hero-eagle.jpg" alt="Cyber Eagle" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-arzens-bg/90 via-arzens-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg via-transparent to-arzens-bg/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center pt-24 md:pt-0 px-[6vw]">
        <div ref={headlineRef} className="max-w-4xl">
          <span className="hero-label label-mono block mb-4">THE SYSTEM IS</span>
          <h1 className="font-heading font-bold text-arzens-text leading-[0.95]">
            <span className="block type-scale-hero-title">
              {wakingText.split('').map((char, i) => (
                <span key={i} className="waking-char inline-block">{char}</span>
              ))}
            </span>
            <span className="block type-scale-hero-title text-gradient">
              {upText.split('').map((char, i) => (
                <span key={i} className="up-char inline-block">{char}</span>
              ))}
            </span>
          </h1>
        </div>

        <p ref={subheadlineRef} className="mt-8 type-scale-body-xl text-arzens-text-muted max-w-xl leading-relaxed">
          Elite cybersecurity for the digital age. We forge digital defenses in the shadows to protect your tomorrow.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 w-full sm:w-auto">
          <Button
            size="lg"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-arzens-accent hover:bg-arzens-accent/90 text-arzens-text font-mono type-scale-button uppercase tracking-wider px-6 sm:px-8 py-5 sm:py-6 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-arzens-accent/30"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Initialize Protocol
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 font-mono type-scale-button uppercase tracking-wider px-6 sm:px-8 py-5 sm:py-6 rounded-lg transition-all hover:-translate-y-0.5"
          >
            <Shield className="w-4 h-4 mr-2" />
            Explore Arsenal
          </Button>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 md:hidden">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-arzens-accent" />
            <div>
              <span className="block text-lg font-heading font-bold text-arzens-text">50+</span>
              <span className="label-mono text-[10px]">Events</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-arzens-accent" />
            <div>
              <span className="block text-lg font-heading font-bold text-arzens-text">25+</span>
              <span className="label-mono text-[10px]">Workshops</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-arzens-accent" />
            <div>
              <span className="block text-lg font-heading font-bold text-arzens-text">10+</span>
              <span className="label-mono text-[10px]">CTF Events</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-arzens-accent" />
            <div>
              <span className="block text-lg font-heading font-bold text-arzens-text">100%</span>
              <span className="label-mono text-[10px]">Secure</span>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="absolute bottom-[7vh] left-[6vw] right-[6vw] hidden md:flex flex-wrap gap-8 md:gap-12">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-arzens-accent" />
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-arzens-text">50+</span>
              <span className="label-mono">Events</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-arzens-accent" />
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-arzens-text">25+</span>
              <span className="label-mono">Workshops</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-arzens-accent" />
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-arzens-text">10+</span>
              <span className="label-mono">CTF Events</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-arzens-accent" />
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-arzens-text">100%</span>
              <span className="label-mono">Secure</span>
            </div>
          </div>
        </div>

        <div ref={microcopyRef} className="absolute bottom-[7vh] right-[4vw] text-right font-mono text-xs text-arzens-text-muted/70 hidden md:block">
          <div>{'>'} security.init()</div>
          <div>{'>'} status: <span className="text-arzens-accent">ACTIVE</span></div>
          <div>{'>'} monitoring...</div>
        </div>
      </div>
    </section>
  );
}
