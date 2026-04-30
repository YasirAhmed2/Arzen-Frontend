import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, CalendarDays, MapPin, Sparkles, Ticket, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

type EventCard = {
  title: string
  subtitle: string
  description: string
  href: string
  label: string
  date: string
  location: string
  details: string[]
  accent: string
}

const eventCards: EventCard[] = [
  {
    title: 'CodyByt3 Hackathon',
    subtitle: 'High-energy build sprint for students and emerging builders',
    description:
      'A focused hackathon experience built around rapid prototyping, mentorship, and sharp product thinking.',
    href: 'https://www.codybyt3.com/',
    label: 'Featured Event',
    date: '2026 Season',
    location: 'Online + On-ground',
    details: ['Mentor access', 'Team-based submissions', 'Prize-driven challenges'],
    accent: 'from-cyan-500/20 via-transparent to-transparent',
  },
  {
    title: 'Air Hackathon',
    subtitle: 'Clean-air innovation challenge with a future-facing brief',
    description:
      'An idea-to-impact hackathon centered on building solutions for cleaner cities, sustainability, and measurable change.',
    href: 'https://airhackathon.com/',
    label: 'Open Innovation',
    date: '2026 Edition',
    location: 'Dhaka, Bangladesh',
    details: ['Climate impact theme', 'Live showcases', 'Community-driven judging'],
    accent: 'from-emerald-500/20 via-transparent to-transparent',
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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-arzens-bg px-[6vw] pb-20 pt-32 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,110,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_30%),linear-gradient(180deg,rgba(5,6,11,0)_0%,rgba(5,6,11,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="events-hero mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="label-mono mb-4 block">FEATURED EVENTS</span>
          <h1 className="text-4xl font-heading font-bold text-arzens-text sm:text-5xl md:text-6xl">
            Curated <span className="text-gradient">hackathons</span> worth opening
          </h1>
          <p className="mt-5 text-base leading-relaxed text-arzens-text-muted sm:text-lg">
            Two hand-picked events, presented as premium cards with direct outbound links, strong hierarchy, and a layout that fits the multiPager visual language.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-arzens-bg-secondary px-4 py-2 text-sm text-arzens-text-muted">
              <Sparkles className="h-4 w-4 text-arzens-accent" />
              Professional event showcase
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-arzens-bg-secondary px-4 py-2 text-sm text-arzens-text-muted">
              <Ticket className="h-4 w-4 text-arzens-accent" />
              Click-through cards
            </div>
          </div>
        </div>

        <div className="events-grid grid gap-6 lg:grid-cols-2 lg:gap-8">
          {eventCards.map((event, index) => (
            <a
              key={event.title}
              href={event.href}
              target="_blank"
              rel="noreferrer"
              className="event-card group relative overflow-hidden rounded-3xl border border-white/10 bg-arzens-bg-secondary p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-arzens-accent/40 md:p-8"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${event.accent}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_36%)]" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <span className="label-mono mb-3 block text-arzens-accent">{event.label}</span>
                    <h2 className="text-2xl font-heading font-bold text-arzens-text md:text-3xl">{event.title}</h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-arzens-text-muted md:text-base">
                      {event.subtitle}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-arzens-bg/80 px-3 py-2 text-right">
                    <span className="block text-xs font-mono uppercase tracking-[0.18em] text-arzens-text-muted">Event</span>
                    <span className="text-sm font-semibold text-arzens-text">0{index + 1}</span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-arzens-bg/60 p-4">
                    <CalendarDays className="h-5 w-5 text-arzens-accent" />
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-[0.14em] text-arzens-text-muted">Date</span>
                      <span className="text-sm text-arzens-text">{event.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-arzens-bg/60 p-4">
                    <MapPin className="h-5 w-5 text-arzens-accent" />
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-[0.14em] text-arzens-text-muted">Location</span>
                      <span className="text-sm text-arzens-text">{event.location}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-arzens-text-muted md:text-base">
                  {event.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {event.details.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] text-arzens-text-muted"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <div className="flex items-center gap-2 text-sm text-arzens-text-muted">
                    <Trophy className="h-4 w-4 text-arzens-accent" />
                    Open the official event page
                  </div>
                  <Button
                    type="button"
                    className="bg-arzens-accent text-white hover:bg-arzens-accent/90"
                  >
                    Visit Site
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-arzens-text-muted">
          Prefer the home-page overview? The event section is still available on the landing page.
        </div>
      </div>
    </section>
  )
}
