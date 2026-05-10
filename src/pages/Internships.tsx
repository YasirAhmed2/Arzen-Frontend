import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Rocket } from 'lucide-react';

export default function Internships() {
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the badge
      gsap.fromTo(
        '.cs-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );

      // Animate the icon
      gsap.fromTo(
        '.cs-icon',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', delay: 0.4 }
      );

      // Animate the heading
      gsap.fromTo(
        '.cs-heading',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.6 }
      );

      // Animate the description
      gsap.fromTo(
        '.cs-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8 }
      );

      // Animate the divider
      gsap.fromTo(
        '.cs-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut', delay: 1.0 }
      );

      // Animate the notify section
      gsap.fromTo(
        '.cs-notify',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.1 }
      );

      // Floating animation for the icon
      gsap.to('.cs-icon-float', {
        y: -8,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Pulse glow ring
      gsap.to('.cs-glow-ring', {
        scale: 1.15,
        opacity: 0.3,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    // Floating particles
    const particleContainer = particlesRef.current;
    if (particleContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(0, 217, 255, ${Math.random() * 0.4 + 0.1});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
        `;
        particleContainer.appendChild(particle);

        gsap.to(particle, {
          y: `random(-80, 80)`,
          x: `random(-40, 40)`,
          opacity: `random(0.1, 0.5)`,
          duration: `random(3, 7)`,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 3,
        });
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center pt-24 pb-20 bg-arzens-bg overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,217,255,0.08) 0%, rgba(0,217,255,0.02) 40%, transparent 70%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Badge */}
        <div className="cs-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-arzens-accent/30 bg-arzens-accent/5 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arzens-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-arzens-accent" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-arzens-accent">
            In Development
          </span>
        </div>

        {/* Animated Icon */}
        <div className="cs-icon relative flex items-center justify-center mb-10">
          {/* Glow ring */}
          <div className="cs-glow-ring absolute w-32 h-32 rounded-full border border-arzens-accent/20" />
          <div className="cs-icon-float flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-arzens-accent/20 to-arzens-accent/5 border border-arzens-accent/20 backdrop-blur-sm">
            <Rocket className="w-9 h-9 text-arzens-accent" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="cs-heading text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-arzens-text mb-6 leading-tight">
          Coming <span className="text-gradient">Soon</span>
        </h1>

        {/* Description */}
        <p className="cs-desc text-base sm:text-lg text-arzens-text-muted max-w-lg mx-auto leading-relaxed mb-10">
          We're building something exciting for aspiring professionals. Our internship program will offer hands-on experience, mentorship, and real-world projects.
        </p>

        {/* Divider */}
        <div className="cs-divider w-24 h-px mx-auto bg-gradient-to-r from-transparent via-arzens-accent/50 to-transparent mb-10 origin-center" />

        {/* Notify / CTA */}
        <div className="cs-notify">
          <p className="text-sm text-arzens-text-muted/70 mb-5 font-mono uppercase tracking-wider">
            Stay tuned for updates
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-arzens-accent/10 border border-arzens-accent/25 text-arzens-accent text-sm font-mono uppercase tracking-wider transition-all duration-300 hover:bg-arzens-accent/20 hover:border-arzens-accent/40 hover:shadow-[0_0_20px_rgba(46,110,255,0.15)]"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}