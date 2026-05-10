import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, MapPin, Sparkles, Ticket, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

type EventCard = {
  title: string
  subtitle: string
  description: string
  href: string
  label: string
  location: string
  details: string[]
  accent: string
}

const eventCards: EventCard[] = [
  {
    title: 'Air Hackathon',
    subtitle: 'Challenge your coding skills in the skies',
    description:
      'Join the Air Hackathon at Air University Islamabad. A premier event bringing together innovators and developers for an intensive coding competition.',
    href: 'https://forms.gle/VtPUBCBJzJRVCa1L6',
    label: 'Hackathon',
    location: 'Air University Islamabad',
    details: ['Hands-on coding', 'Networking', 'Innovation'],
    accent: 'from-blue-500/20 via-transparent to-transparent',
  },
  {
    title: 'BlackByt3 Convention',
    subtitle: 'Online CTF Competition with PKR 70,000 prize pool',
    description:
      'Cybersecurity enthusiasts, get ready for the ultimate challenge! BlackByt3 Convention is an online CTF event featuring Web, OSINT, Crypto, Reverse Engineering, Forensics, and PWN challenges. Use promo code "THE ARZENS" for Rs. 600 OFF!',
    href: 'https://tally.so/r/XxYKGj',
    label: 'CTF Event',
    location: 'Held Online',
    details: ['PKR 1600 fee', 'PKR 70K prize pool', 'Promo: THE ARZENS'],
    accent: 'from-purple-500/20 via-transparent to-transparent',
  },
  {
    title: 'KheloCTF',
    subtitle: 'Global capture-the-flag competition',
    description:
      'Compete globally in capture-the-flag challenges against hackers and security enthusiasts from around the world. Test your skills across multiple domains and climb the leaderboard.',
    href: 'https://www.kheloctf.com',
    label: 'Global CTF',
    location: 'Held Online',
    details: ['Global competition', 'Multiple domains', 'Leaderboard'],
    accent: 'from-cyan-500/20 via-transparent to-transparent',
  },
]

export default function EventsPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.events-hero',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      )

      gsap.fromTo(
        '.event-card',
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.events-grid',
            start: 'top 78%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-arzens-bg px-4 sm:px-6 md:px-[6vw] pb-16 sm:pb-20 pt-24 sm:pt-32 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_30%),linear-gradient(180deg,rgba(5,6,11,0)_0%,rgba(5,6,11,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 sm:h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="events-hero mx-auto mb-8 sm:mb-12 md:mb-16 max-w-3xl text-center">
          <span className="label-mono mb-3 sm:mb-4 block text-xs sm:text-sm">FEATURED EVENTS & CTFs</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-arzens-text leading-tight">
            Join the <span className="text-gradient">Movement</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-arzens-text-muted">
            Participate in our flagship hackathons and CTF competitions to sharpen your cybersecurity skills and connect with the community.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-arzens-bg-secondary px-3 sm:px-4 py-2 text-xs sm:text-sm text-arzens-text-muted">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-arzens-accent" />
              <span>Professional Events</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-arzens-bg-secondary px-3 sm:px-4 py-2 text-xs sm:text-sm text-arzens-text-muted">
              <Ticket className="h-3 w-3 sm:h-4 sm:w-4 text-arzens-accent" />
              <span>Easy Registration</span>
            </div>
          </div>
        </div>

        <div className="events-grid grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {eventCards.map((event, index) => (
            <a
              key={event.title}
              href={event.href}
              target="_blank"
              rel="noreferrer"
              className="event-card group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-arzens-bg-secondary p-4 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-arzens-accent/40 flex flex-col h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${event.accent}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_36%)]" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 sm:mb-6 md:mb-8 flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="label-mono mb-2 sm:mb-3 block text-arzens-accent text-xs">{event.label}</span>
                    <h2 className="text-lg sm:text-2xl md:text-xl lg:text-2xl font-heading font-bold text-arzens-text leading-tight break-words">{event.title}</h2>
                    <p className="mt-1 sm:mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-arzens-text-muted">
                      {event.subtitle}
                    </p>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-arzens-bg/80 px-2 sm:px-3 py-2 text-right flex-shrink-0">
                    <span className="block text-xs font-mono uppercase tracking-[0.12em] text-arzens-text-muted">Event</span>
                    <span className="text-sm font-semibold text-arzens-text">0{index + 1}</span>
                  </div>
                </div>

                <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-arzens-bg/60 p-3 sm:p-4">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-arzens-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-xs font-mono uppercase tracking-[0.12em] text-arzens-text-muted">Location</span>
                      <span className="text-xs sm:text-sm text-arzens-text truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-arzens-bg/60 p-3 sm:p-4">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-arzens-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-xs font-mono uppercase tracking-[0.12em] text-arzens-text-muted">Type</span>
                      <span className="text-xs sm:text-sm text-arzens-text truncate">{event.label}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-arzens-text-muted mb-4 sm:mb-6 flex-grow">
                  {event.description}
                </p>

                <div className="mb-4 sm:mb-6 flex flex-wrap gap-2">
                  {event.details.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1 text-xs font-mono uppercase tracking-[0.1em] text-arzens-text-muted whitespace-nowrap"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 sm:gap-4 pt-4 sm:pt-6 md:pt-8">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-arzens-text-muted">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-arzens-accent" />
                    <span className="hidden sm:inline">Register Now</span>
                  </div>
                  <Button
                    type="button"
                    className="bg-arzens-accent text-white hover:bg-arzens-accent/90 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2 h-auto"
                  >
                    <span className="hidden sm:inline">Visit</span>
                    <span className="sm:hidden">Go</span>
                    <ArrowUpRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-arzens-text-muted">
          More events? Check the home page for our complete event section.
        </div>
      </div>
    </section>
  )
}
