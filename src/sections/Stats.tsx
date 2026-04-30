import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25, suffix: '+', label: 'Workshops Conducted' },
  { value: 50, suffix: '+', label: 'Total Events' },
  { value: 10, suffix: '+', label: 'CTF Events' },
  { value: 20, suffix: '+', label: 'Seminars' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counterRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Scramble effect before settling
          let scrambleCount = 0;
          const scrambleInterval = setInterval(() => {
            setCount(
              Math.floor(Math.random() * value * 1.5)
            );
            scrambleCount++;
            if (scrambleCount > 10) {
              clearInterval(scrambleInterval);
              gsap.to(
                { val: 0 },
                {
                  val: value,
                  duration: 1.5,
                  ease: 'power2.out',
                  onUpdate: function () {
                    setCount(Math.floor(this.targets()[0].val));
                  },
                }
              );
            }
          }, 50);
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={counterRef} className="font-heading">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats cards animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-arzens-bg"
    >
      <div className="px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={contentRef}>
            <p className="label-mono mb-4">
              OUR SUCCESS STORIES
            </p>
            <h2 className="type-scale-section-title font-heading font-bold text-arzens-text mb-6">
              See How We've Helped Businesses{' '}
              <span className="text-gradient">Thrive</span>
            </h2>
            <p className="type-scale-body text-arzens-text-muted mb-8 leading-relaxed">
              Our track record speaks for itself. We've empowered countless 
              organizations with our cybersecurity expertise, helping them stay 
              secure in an ever-evolving digital landscape.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-arzens-accent/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-arzens-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-arzens-text-muted">Call Us</p>
                <p className="font-heading text-arzens-accent">+92-329-5203738</p>
              </div>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card-cyber p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="font-heading text-4xl lg:text-5xl text-arzens-accent font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-arzens-text-muted text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
