import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Target, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Cpu,
    title: 'IT & Cybersecurity Expertise',
    description: 'Securing the Future of IT with cutting-edge solutions.',
  },
  {
    icon: Target,
    title: 'Tailored Solutions for Everyone',
    description: 'Unique Strategies for Every Vision and Business.',
  },
  {
    icon: Lightbulb,
    title: 'Innovative Approaches for Growth',
    description: 'Fresh Perspectives for Advancement and Success.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraphs = paragraphsRef.current;
    const image = imageRef.current;
    const valuesContainer = valuesRef.current;

    if (!section || !heading || !paragraphs || !image || !valuesContainer) return;

    const paragraphElements = paragraphs.querySelectorAll('p');
    const valueCards = valuesContainer.querySelectorAll('.value-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(heading, { x: -60, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 0.4,
        },
      });

      gsap.fromTo(paragraphElements, { y: 24, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          end: 'top 35%',
          scrub: 0.4,
        },
      });

      gsap.fromTo(image, { x: 80, opacity: 0, scale: 0.98 }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 0.4,
        },
      });

      gsap.fromTo(valueCards, { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: valuesContainer,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 0.4,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-arzens-bg"
    >
      <div className="px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 ref={headingRef} className="type-scale-section-title font-heading font-bold text-arzens-text mb-8">
              About <span className="text-gradient">Us</span>
            </h2>

            <div ref={paragraphsRef} className="space-y-6">
              <p className="type-scale-body text-arzens-text-muted leading-relaxed">
                <strong className="text-arzens-text">THE ARZENS</strong> is an elite cybersecurity collective built for the digital age. We unite ethical hackers, researchers, and engineers to defend systems before threats emerge.
              </p>
              <p className="type-scale-body text-arzens-text-muted leading-relaxed">
                Our mission is to empower businesses with cutting-edge IT solutions and cybersecurity services. We believe in securing your digital future with innovation and expertise.
              </p>
              <p className="type-scale-body text-arzens-text-muted leading-relaxed">
                From penetration testing to AI-driven threat detection, we offer comprehensive solutions tailored to protect your business from evolving digital threats.
              </p>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-card">
              <img src="/about-figure.jpg" alt="THE ARZENS Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-arzens-bg/80 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-arzens-accent text-white px-4 py-2 rounded-lg font-mono text-sm">
              EST. 2024
            </div>
          </div>
        </div>

        <div
          ref={valuesRef}
          className="mt-20 grid md:grid-cols-3 gap-4 md:gap-6"
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card bg-arzens-bg-secondary rounded-lg p-6 border border-white/10 hover:border-arzens-accent/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-arzens-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-arzens-accent/20 transition-colors">
                  <value.icon className="w-6 h-6 text-arzens-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-arzens-text mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-arzens-text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
