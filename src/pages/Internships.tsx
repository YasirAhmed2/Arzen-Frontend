import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BriefcaseBusiness, Code2, Compass, Upload, CheckCircle2, Rocket, Award, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitApplication } from '@/services/applicationApi';

gsap.registerPlugin(ScrollTrigger);

const internshipDomains = [
  { value: 'ai-ml', label: 'Artificial Intelligence & Machine Learning' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'mobile-dev', label: 'Mobile App Development' },
  { value: 'backend', label: 'Backend Engineering' },
  { value: 'frontend', label: 'Frontend Engineering' },
  { value: 'full-stack', label: 'Full Stack Development' },
  { value: 'devops', label: 'DevOps & Infrastructure' },
  { value: 'data-science', label: 'Data Science & Analytics' },
  { value: 'cloud', label: 'Cloud Computing' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'blockchain', label: 'Blockchain & Web3' },
  { value: 'game-dev', label: 'Game Development' },
  { value: 'iot', label: 'Internet of Things (IoT)' },
  { value: 'computer-vision', label: 'Computer Vision' },
  { value: 'nlp', label: 'Natural Language Processing' },
  { value: 'product', label: 'Product Management' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'qa', label: 'Quality Assurance & Testing' },
];

const semesterOptions = [
  { value: '1', label: '1st Semester' },
  { value: '2', label: '2nd Semester' },
  { value: '3', label: '3rd Semester' },
  { value: '4', label: '4th Semester' },
  { value: '5', label: '5th Semester' },
  { value: '6', label: '6th Semester' },
  { value: '7', label: '7th Semester' },
  { value: '8', label: '8th Semester' },
  { value: 'final', label: 'Final Year' },
];

const tracks = [
  { icon: Rocket, title: 'Product-minded teams', desc: 'Build with fast-moving delivery and direct feedback loops.' },
  { icon: Code2, title: 'Engineering practice', desc: 'Ship secure features, tooling, and automation alongside mentors.' },
  { icon: BriefcaseBusiness, title: 'Cross-functional exposure', desc: 'Work across operations, community, and strategy with real ownership.' },
  { icon: Compass, title: 'Career guidance', desc: 'Get direction, structured feedback, and portfolio-building support.' },
];

const perks = [
  { icon: Award, title: 'Mentorship', desc: 'Weekly reviews with people who actually ship.' },
  { icon: Laptop, title: 'Project work', desc: 'Hands-on assignments instead of passive shadowing.' },
  { icon: CheckCircle2, title: 'Fast decisions', desc: 'Clear status updates after admin review and email notification.' },
];

export default function Internships() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    city: '',
    department: '',
    semester: '',
    internshipDomain: '',
    experience: '',
    skills: '',
    motivation: '',
    portfolioLinks: '',
    cv: null as File | null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.intern-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      gsap.fromTo('.track-card', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.tracks-grid', start: 'top 78%' } });
      gsap.fromTo('.perk-card', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.perks-grid', start: 'top 80%' } });
      gsap.fromTo('.intern-form', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, scrollTrigger: { trigger: '.intern-apply', start: 'top 72%' } });
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
        role: 'internship',
        roleSpecific: {
          internship: {
            university: formData.university.trim(),
            city: formData.city.trim(),
            department: formData.department.trim(),
            semester: formData.semester.trim(),
            internshipDomain: formData.internshipDomain.trim(),
            experience: formData.experience.trim(),
            skills: formData.skills.trim(),
            motivation: formData.motivation.trim(),
            portfolioLinks: formData.portfolioLinks.trim(),
            cvName: formData.cv?.name || '',
            cvType: formData.cv?.type || '',
            cvSize: formData.cv?.size || 0,
          },
        },
      });

      setFeedback({
        type: 'success',
        message: 'Internship application submitted. You will receive an approval or rejection email after review.',
      });
      setFormData({
        name: '',
        email: '',
        university: '',
        city: '',
        department: '',
        semester: '',
        internshipDomain: '',
        experience: '',
        skills: '',
        motivation: '',
        portfolioLinks: '',
        cv: null,
      });
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
        <div className="intern-heading text-center mb-16">
          <span className="label-mono block mb-4">INTERNSHIP PROGRAM</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-arzens-text mb-6">
            Build your <span className="text-gradient">first serious experience</span>
          </h1>
          <p className="text-base sm:text-lg text-arzens-text-muted max-w-2xl mx-auto">
            Apply for an internship experience designed around hands-on work, mentoring, and visible outcomes.
          </p>
        </div>

        <div className="tracks-grid grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {tracks.map((track, index) => (
            <div key={index} className="track-card rounded-lg border border-white/10 bg-arzens-bg-secondary p-6 transition-all duration-300 hover:border-arzens-accent/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-arzens-accent/10">
                <track.icon className="h-6 w-6 text-arzens-accent" />
              </div>
              <h3 className="mb-2 text-xl font-heading font-semibold text-arzens-text">{track.title}</h3>
              <p className="text-sm leading-relaxed text-arzens-text-muted">{track.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-arzens-text mb-8 text-center">
            Internship <span className="text-gradient">Perks</span>
          </h2>
          <div className="perks-grid grid md:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <div key={index} className="perk-card rounded-lg border border-white/10 bg-arzens-bg-secondary p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-arzens-accent/10">
                  <perk.icon className="h-7 w-7 text-arzens-accent" />
                </div>
                <h3 className="mb-2 text-xl font-heading font-semibold text-arzens-text">{perk.title}</h3>
                <p className="text-sm text-arzens-text-muted">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="intern-apply">
          <div className="intern-form mx-auto max-w-4xl rounded-lg border border-white/10 bg-arzens-bg-secondary p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-arzens-text mb-4">
                Apply for an <span className="text-gradient">internship seat</span>
              </h2>
              <p className="text-arzens-text-muted">
                Share your profile and we will move your request through review, decision, and email notification.
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
              <div className="grid gap-6 md:grid-cols-2">
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

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="label-mono block mb-2">UNIVERSITY *</label>
                  <Input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                    placeholder="Enter your university"
                    required
                  />
                </div>
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
              </div>

              <div className="grid gap-6 md:grid-cols-2">
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
                <div>
                  <label className="label-mono block mb-2">SEMESTER *</label>
                  <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                    <SelectTrigger className="bg-arzens-bg border-white/10 text-arzens-text">
                      <SelectValue placeholder="Select your semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-arzens-bg-secondary border-white/10">
                      {semesterOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="label-mono block mb-2">INTERNSHIP DOMAIN / FIELD *</label>
                <Select value={formData.internshipDomain} onValueChange={(value) => setFormData({ ...formData, internshipDomain: value })}>
                  <SelectTrigger className="bg-arzens-bg border-white/10 text-arzens-text">
                    <SelectValue placeholder="Select your preferred internship domain" />
                  </SelectTrigger>
                  <SelectContent className="bg-arzens-bg-secondary border-white/10">
                    {internshipDomains.map((domain) => (
                      <SelectItem key={domain.value} value={domain.value}>
                        {domain.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="label-mono block mb-2">EXPERIENCE *</label>
                <Textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="min-h-[100px] bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                  placeholder="Share internships, personal projects, community work, or relevant experience"
                  required
                />
              </div>

              <div>
                <label className="label-mono block mb-2">SKILLS *</label>
                <Textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="min-h-[90px] bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                  placeholder="List your core skills, separated by commas or lines"
                  required
                />
              </div>

              <div>
                <label className="label-mono block mb-2">WHY THIS INTERNSHIP? *</label>
                <Textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="min-h-[120px] bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                  placeholder="Tell us why you want this internship and what you want to learn"
                  required
                />
              </div>

              <div>
                <label className="label-mono block mb-2">PORTFOLIO LINKS</label>
                <Textarea
                  value={formData.portfolioLinks}
                  onChange={(e) => setFormData({ ...formData, portfolioLinks: e.target.value })}
                  className="min-h-[90px] bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                  placeholder="GitHub, portfolio, LinkedIn, or any work samples"
                />
              </div>

              <div>
                <label className="label-mono block mb-2">UPLOAD CV / RESUME (OPTIONAL)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="intern-resume-upload"
                  />
                  <label
                    htmlFor="intern-resume-upload"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-arzens-bg px-4 py-3 transition-colors hover:border-arzens-accent/50"
                  >
                    <Upload className="h-5 w-5 text-arzens-accent" />
                    <span className="text-sm text-arzens-text-muted sm:text-base">
                      {formData.cv ? formData.cv.name : 'Click to upload your CV or resume'}
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-arzens-accent py-6 font-mono text-sm uppercase tracking-wider text-white hover:bg-arzens-accent/90 disabled:opacity-60"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Internship Application'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}