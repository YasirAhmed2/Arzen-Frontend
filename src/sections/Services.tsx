import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Shield,
  Bug,
  Fingerprint,
  Trophy,
  Settings,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Search,
    title: 'Penetration Testing',
    description:
      'Real attack simulations with clear remediation strategies. We identify vulnerabilities before attackers do.',
    tags: ['Web App Testing', 'Network Testing', 'Mobile App Testing'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions to protect your digital assets from evolving cyber threats.',
    tags: ['Threat Detection', 'Security Audits', 'Compliance'],
  },
  {
    icon: Bug,
    title: 'Malware Analysis',
    description:
      'Deep analysis of malicious software to understand behavior and develop effective countermeasures.',
    tags: ['Static Analysis', 'Dynamic Analysis', 'Reverse Engineering'],
  },
  {
    icon: Fingerprint,
    title: 'Digital Forensics',
    description:
      'Expert investigation and analysis of digital evidence for incident response and legal proceedings.',
    tags: ['Data Recovery', 'Incident Response', 'Evidence Collection'],
  },
  {
    icon: Trophy,
    title: 'CTF Events',
    description:
      'Host and participate in Capture The Flag competitions to sharpen skills and identify talent.',
    tags: ['Event Hosting', 'Challenge Design', 'Training'],
  },
  {
    icon: Settings,
    title: 'IT Consulting',
    description:
      'Strategic technology consulting to optimize your IT infrastructure and security posture.',
    tags: ['Architecture Review', 'Strategy Planning', 'Implementation'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const serviceCards = grid.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(header, { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 0.4,
        },
      });

      gsap.fromTo(serviceCards, { y: 40, opacity: 0, scale: 0.98 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 0.4,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-arzens-bg"
    >
      <div className="px-[6vw]">
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span className="label-mono block mb-4">OUR ARSENAL</span>
          <h2 className="type-scale-section-title font-heading font-bold text-arzens-text mb-4">
            Services We <span className="text-gradient">Provide</span>
          </h2>
          <p className="type-scale-body text-arzens-text-muted max-w-xl">
            Comprehensive cybersecurity solutions tailored to protect your business from evolving digital threats.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-arzens-bg-secondary rounded-lg p-6 border border-white/10 hover:border-arzens-accent/40 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-arzens-accent/10 flex items-center justify-center mb-5 group-hover:bg-arzens-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-arzens-accent" />
              </div>

              <h3 className="text-xl font-heading font-semibold text-arzens-text mb-3 group-hover:text-arzens-accent transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-arzens-text-muted leading-relaxed mb-5">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-arzens-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-arzens-accent text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
