import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Twitter, Upload, Star, Users, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitApplication } from '@/services/applicationApi';

gsap.registerPlugin(ScrollTrigger);

const ambassadors = [
  {
    name: 'Ahmad Khan',
    university: 'FAST NUCES',
    city: 'Islamabad',
    role: 'Lead Ambassador',
    bio: 'Cybersecurity enthusiast with a passion for ethical hacking and community building.',
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Sara Malik',
    university: 'NUST',
    city: 'Islamabad',
    role: 'Campus Ambassador',
    bio: 'AI and security researcher working on innovative threat detection solutions.',
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Usman Ali',
    university: 'UET Lahore',
    city: 'Lahore',
    role: 'Campus Ambassador',
    bio: 'Full-stack developer with expertise in secure web application development.',
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
  {
    name: 'Fatima Zahra',
    university: 'IBA Karachi',
    city: 'Karachi',
    role: 'Campus Ambassador',
    bio: 'Data science enthusiast focused on security analytics and threat intelligence.',
    socials: { linkedin: '#', github: '#', twitter: '#' },
  },
];

const benefits = [
  { icon: Star, title: 'Exclusive Access', desc: 'Get early access to events, workshops, and CTF competitions.' },
  { icon: Users, title: 'Network Growth', desc: 'Connect with industry professionals and like-minded students.' },
  { icon: Award, title: 'Certificates', desc: 'Receive official ambassador certificates and recommendation letters.' },
];

export default function Ambassador() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    uniName: '',
    city: '',
    department: '',
    semester: '',
    previousWork: '',
    socialLinks: '',
    cv: null as File | null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.amb-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      gsap.fromTo('.ambassador-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.ambassadors-grid', start: 'top 75%' } });
      gsap.fromTo('.benefit-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.benefits-grid', start: 'top 80%' } });
      gsap.fromTo('.apply-form', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, scrollTrigger: { trigger: '.apply-section', start: 'top 70%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await submitApplication({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: 'ambassador',
        roleSpecific: {
          ambassador: {
            university: formData.uniName.trim(),
            city: formData.city.trim(),
            department: formData.department.trim(),
            semester: formData.semester.trim(),
            previousWork: formData.previousWork.trim(),
            socialLinks: formData.socialLinks.trim(),
            cvName: formData.cv?.name || '',
            cvType: formData.cv?.type || '',
            cvSize: formData.cv?.size || 0,
          },
        },
      });

      setFeedback({
        type: 'success',
        message: 'Application submitted. The review team will contact you after approval or rejection.',
      });
      setFormData({ name: '', email: '', uniName: '', city: '', department: '', semester: '', previousWork: '', socialLinks: '', cv: null });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Submission failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen pt-32 pb-20 bg-arzens-bg">
      <div className="px-[6vw]">
        <div className="amb-heading text-center mb-16">
          <span className="label-mono block mb-4">AMBASSADOR PROGRAM</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-arzens-text mb-6">
            Our <span className="text-gradient">Ambassadors</span>
          </h1>
          <p className="text-base sm:text-lg text-arzens-text-muted max-w-2xl mx-auto">
            Meet the passionate individuals representing THE ARZENS across different campuses and cities.
          </p>
        </div>

        <div className="ambassadors-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {ambassadors.map((amb, index) => (
            <div key={index} className="ambassador-card bg-arzens-bg-secondary rounded-lg overflow-hidden border border-white/10 hover:border-arzens-accent/40 transition-all duration-300">
              <div className="relative h-32 bg-gradient-to-br from-arzens-accent/20 to-arzens-bg flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-arzens-bg border-2 border-arzens-accent/50 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-arzens-accent">
                    {amb.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-arzens-accent/20 text-arzens-accent border border-arzens-accent/30 mb-2 inline-block">
                  {amb.role}
                </span>
                <h3 className="text-lg font-heading font-semibold text-arzens-text mb-1">{amb.name}</h3>
                <p className="text-sm text-arzens-accent mb-1">{amb.university}</p>
                <p className="text-xs text-arzens-text-muted mb-3">{amb.city}</p>
                <p className="text-sm text-arzens-text-muted leading-relaxed mb-4">{amb.bio}</p>
                <div className="flex gap-2">
                  <a href={amb.socials.linkedin} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-arzens-text-muted" />
                  </a>
                  <a href={amb.socials.github} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors">
                    <Github className="w-4 h-4 text-arzens-text-muted" />
                  </a>
                  <a href={amb.socials.twitter} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-arzens-accent/20 transition-colors">
                    <Twitter className="w-4 h-4 text-arzens-text-muted" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-arzens-text mb-8 text-center">
            Ambassador <span className="text-gradient">Benefits</span>
          </h2>
          <div className="benefits-grid grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card bg-arzens-bg-secondary rounded-lg p-6 border border-white/10 text-center">
                <div className="w-14 h-14 rounded-lg bg-arzens-accent/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-arzens-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-arzens-text mb-2">{benefit.title}</h3>
                <p className="text-sm text-arzens-text-muted">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="apply-section">
          <div className="apply-form bg-arzens-bg-secondary rounded-lg p-6 md:p-12 border border-white/10 max-w-4xl mx-auto shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-arzens-text mb-4">
                Want to be the next <span className="text-gradient">ARZENS Ambassador?</span>
              </h2>
              <p className="text-arzens-text-muted">
                Join our elite network of campus representatives and help us build the future of cybersecurity.
              </p>
            </div>

            {feedback.message ? (
              <div
                role="status"
                aria-live="polite"
                className={`mb-8 rounded-lg border px-4 py-4 text-sm ${
                  feedback.type === 'success'
                    ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-100'
                    : 'border-red-400/50 bg-red-500/10 text-red-100'
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-mono block mb-2">FULL NAME *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="label-mono block mb-2">EMAIL ADDRESS *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-mono block mb-2">UNIVERSITY NAME *</label>
                  <Input
                    type="text"
                    value={formData.uniName}
                    onChange={(e) => setFormData({ ...formData, uniName: e.target.value })}
                    className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                    placeholder="Enter your university name"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-mono block mb-2">CITY *</label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                    placeholder="Enter your city"
                    required
                  />
                </div>
                <div>
                  <label className="label-mono block mb-2">DEPARTMENT *</label>
                  <Input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label-mono block mb-2">SEMESTER *</label>
                <Input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                  placeholder="e.g., 5th Semester"
                  required
                />
              </div>

              <div>
                <label className="label-mono block mb-2">PREVIOUS WORK (IF ANY)</label>
                <Textarea
                  value={formData.previousWork}
                  onChange={(e) => setFormData({ ...formData, previousWork: e.target.value })}
                  className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent min-h-[100px]"
                  placeholder="Describe any previous ambassador roles, community work, or relevant experience..."
                />
              </div>

              <div>
                <label className="label-mono block mb-2">SOCIAL MEDIA LINKS</label>
                <Textarea
                  value={formData.socialLinks}
                  onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                  className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent min-h-[80px]"
                  placeholder="LinkedIn, GitHub, Twitter, etc. (one per line)"
                />
              </div>

              <div>
                <label className="label-mono block mb-2">UPLOAD CV (OPTIONAL)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center gap-3 bg-arzens-bg border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-arzens-accent/50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-arzens-accent" />
                    <span className="text-arzens-text-muted text-sm sm:text-base">
                      {formData.cv ? formData.cv.name : 'Click to upload your CV (PDF, DOC, DOCX)'}
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-arzens-accent hover:bg-arzens-accent/90 text-white font-mono text-sm uppercase tracking-wider py-6 disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
