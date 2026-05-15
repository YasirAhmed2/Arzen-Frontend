import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Syed Muhammad Qammar Abbas Zaidi',
    level: 'L1',
    role: 'CEO · Founder',
    bio: 'The architect of The Arzens. Orchestrating offensive operations and strategic defense.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/syed-muhammad-qammar-abbas-zaidi-b169b4369/',
      github: 'https://github.com/Arzen-007',
    },
  },
  {
    name: 'Daniyal Aftab Mirza',
    level: 'L2',
    role: 'CTO · Co-Founder',
    bio: 'Ensuring swift execution of all tactical engagements. Master of logistics.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/mirza-daniyal-khan',
      github: 'https://github.com/MDK-4203',
    },
  },
  {
    name: 'Abeera Mehtab',
    level: 'L2',
    role: 'CIO · Co-Founder',
    bio: 'Driving information systems and strategic operations with a sharp focus on scale.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/abeera-mehtab-cysa/',
      github: 'https://github.com/Abeera-Mehtab',
    },
  },
  {
    name: 'Hilmand Khan',
    level: 'L2',
    role: 'CISO',
    bio: 'Protecting the organization with a security-first mindset and disciplined execution.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/hilmand-khan-992557104/',
      github: 'https://github.com/Hilmand',
    },
  },
  {
    name: 'Taha Saeed',
    level: 'L2',
    role: 'CMO',
    bio: 'Shaping the voice of The Arzens through clear messaging and consistent brand presence.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/taha-saeed-8a012524b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/tahas0123',
    },
  },
  {
    name: 'Saim Hassan',
    level: 'L3',
    role: 'CTF Development Team Head',
    bio: 'Designing competition-ready challenges that sharpen the team and the wider community.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/agent47hero?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      github: 'https://github.com/AGENT47HERO',
    },
  },
  {
    name: 'Yasir Ahmed',
    level: 'L3',
    role: 'AI Engineer',
    bio: 'Building intelligent systems with a security-minded approach and a focus on reliability.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/iamyasirahmed/',
      github: 'https://github.com/yasirahmed2',
    },
  },
  {
    name: 'Tahseen Fatima',
    level: 'L4',
    role: 'Creative Lead · Social Media',
    bio: 'Guiding the creative identity of The Arzens across digital channels and campaigns.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/tahseen-fatima-856231334',
      github: 'https://github.com/fatisniff-coder',
    },
  },
];

const levelOrder = ['L1', 'L2', 'L3', 'L4'] as const;

const levelDescriptions: Record<string, string> = {
  L1: 'Leadership and founding direction',
  L2: 'Core operational leadership',
  L3: 'Specialist execution team',
  L4: 'Creative and support leadership',
};

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const teamRows = levelOrder.map((level) => ({
    level,
    members: teamMembers.filter((member) => member.level === level),
  })).filter((row) => row.members.length > 0);

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

        <div ref={gridRef} className="space-y-10 md:space-y-12">
          {teamRows.map((row) => (
            <div key={row.level} className="space-y-4 md:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <span className="label-mono block mb-2">{row.level}</span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-arzens-text">
                    {levelDescriptions[row.level]}
                  </h3>
                </div>
                <span className="text-sm text-arzens-text-muted">
                  {row.members.length} team member{row.members.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {row.members.map((member) => (
                  <div
                    key={member.name}
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
                          {member.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="type-scale-body font-heading font-semibold text-arzens-text mb-1 break-words leading-tight">
                        {member.name}
                      </h4>
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
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} profile details`}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-arzens-text-muted hover:text-arzens-accent" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
