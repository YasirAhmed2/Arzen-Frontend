import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Syed Muhammad Qammar Abbas Zaidi',
    clearance: 'L5_ADMIN',
    role: 'Founder & CEO',
    bio: 'The architect of The Arzens. Orchestrating offensive operations and strategic defense.',
    socials: {
      linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Syed%20Muhammad%20Qammar%20Abbas%20Zaidi',
      github: 'https://github.com/search?q=Syed%20Muhammad%20Qammar%20Abbas%20Zaidi&type=users',
      twitter: 'https://x.com/search?q=Syed%20Muhammad%20Qammar%20Abbas%20Zaidi&src=typed_query',
    },
  },
  {
    name: 'Daniyal Aftab Mirza',
    clearance: 'L4_COMMAND',
    role: 'Vice Head Developer',
    bio: 'Ensuring swift execution of all tactical engagements. Master of logistics.',
    socials: {
      linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Daniyal%20Aftab%20Mirza',
      github: 'https://github.com/search?q=Daniyal%20Aftab%20Mirza&type=users',
      twitter: 'https://x.com/search?q=Daniyal%20Aftab%20Mirza&src=typed_query',
    },
  },
  {
    name: 'Yasir Ahmed',
    clearance: 'L4_OFFENSIVE',
    role: 'AI Engineer',
    bio: 'Breaching secure perimeters before breakfast. Network infrastructure exploitation.',
    socials: {
      linkedin: 'https://linkedin.com/iamyasirahmed',
      github: 'https://github.com/yasirahmed2',
      twitter: 'https://x.com/search?q=Yasir%20Ahmed&src=typed_query',
    },
  },
  {
    name: 'Abdul Hannan',
    clearance: 'L3_CLOUD',
    role: 'Web Developer',
    bio: 'Frontend sorcerer. Backend demon. Deploys code that secures itself.',
    socials: {
      linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Abdul%20Hannan',
      github: 'https://github.com/search?q=Abdul%20Hannan&type=users',
      twitter: 'https://x.com/search?q=Abdul%20Hannan&src=typed_query',
    },
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const teamCards = grid.querySelectorAll('.team-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { x: -50, opacity: 0 },
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

      gsap.fromTo(teamCards,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-arzens-bg"
    >
      <div className="px-[6vw]">
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span className="label-mono block mb-4">THE OPERATORS</span>
          <h2 className="type-scale-section-title font-heading font-bold text-arzens-text">
            Meet Our <span className="text-gradient">Elite Team</span>
          </h2>
          <p className="mt-4 type-scale-body text-arzens-text-muted max-w-xl">
            Our squad of cybersecurity experts, ethical hackers, and tech innovators working tirelessly to secure your digital future.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card group bg-arzens-bg-secondary rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300"
            >
              <div className="relative h-32 bg-gradient-to-br from-arzens-accent/20 to-arzens-bg flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-arzens-bg border-2 border-arzens-accent/50 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-arzens-accent">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-arzens-accent/20 text-arzens-accent border border-arzens-accent/30">
                    {member.clearance}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="type-scale-body font-heading font-semibold text-arzens-text mb-1 break-words leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-arzens-accent mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-arzens-text-muted leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-arzens-text-muted">ONLINE</span>
                </div>

                <div className="flex gap-3">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn profile`}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-arzens-text-muted hover:text-arzens-accent" />
                  </a>
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub profile`}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors"
                  >
                    <Github className="w-4 h-4 text-arzens-text-muted hover:text-arzens-accent" />
                  </a>
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Twitter/X profile`}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-arzens-text-muted hover:text-arzens-accent" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
