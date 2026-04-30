import { useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, CheckCircle2, LogOut, RefreshCcw, ShieldCheck, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { clearStoredAdminToken, getStoredAdminToken, setStoredAdminToken } from '@/services/httpClient';
import { getAdminApplications, updateAdminApplicationStatus } from '@/services/adminApi';
import { loginAdmin } from '@/services/adminApi';

type Application = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  roleSpecific?: Record<string, Record<string, unknown>>;
};

const STATUS_STYLES: Record<string, string> = {
  pending: 'border-cyan-400/45 bg-cyan-400/15 text-cyan-100',
  approved: 'border-emerald-400/45 bg-emerald-400/15 text-emerald-100',
  rejected: 'border-red-400/45 bg-red-400/15 text-red-100',
};

function formatDate(value?: string) {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function summarizeRoleData(application: Application) {
  const roleData = application.roleSpecific?.[application.role || ''] || {};

  return Object.entries(roleData)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([key, value]) => ({ key, value: Array.isArray(value) ? value.join(', ') : String(value) }));
}

export default function AdminDashboardPage() {
  const [token, setToken] = useState(() => getStoredAdminToken());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function loadApplications() {
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getAdminApplications();
      setApplications(data.applications || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load applications');
      clearStoredAdminToken();
      setToken('');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      void loadApplications();
    }
  }, [token]);

  const counts = useMemo(() => {
    const summary = { total: applications.length, pending: 0, approved: 0, rejected: 0, ambassador: 0, internship: 0 };

    applications.forEach((application) => {
      if (application.status && summary[application.status as keyof typeof summary] !== undefined) {
        summary[application.status as keyof typeof summary] += 1;
      }

      if (application.role === 'ambassador' || application.role === 'internship') {
        summary[application.role] += 1;
      }
    });

    return summary;
  }, [applications]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setAuthLoading(true);
    setError('');

    try {
      const data = await loginAdmin(email.trim(), password);
      if (!data?.token) {
        throw new Error('Login response did not include a token');
      }

      setStoredAdminToken(data.token);
      setToken(data.token);
      setSuccess('Admin session initialized.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleStatusUpdate(id: string, nextStatus: 'approved' | 'rejected') {
    setSubmittingId(id);
    setError('');
    setSuccess('');

    try {
      const response = await updateAdminApplicationStatus(id, nextStatus);
      setApplications((current) =>
        current.map((application) =>
          application._id === id ? { ...application, status: nextStatus } : application,
        ),
      );
      setSuccess(response?.notification?.delivered
        ? `Status updated to ${nextStatus} and notification email was delivered.`
        : `Status updated to ${nextStatus}. Email notification was not delivered.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to update application status');
    } finally {
      setSubmittingId('');
    }
  }

  function handleLogout() {
    clearStoredAdminToken();
    setToken('');
    setApplications([]);
    setPassword('');
    setEmail('');
    setSuccess('');
  }

  if (!token) {
    return (
      <section className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-[6vw] py-24">
        <div className="w-full rounded-3xl border border-white/10 bg-arzens-bg-secondary p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-10">
          <div className="mb-8 text-center">
            <span className="label-mono block mb-4">ADMIN CONTROL CENTER</span>
            <h1 className="text-4xl font-heading font-bold text-arzens-text">
              Review <span className="text-gradient">Applications</span>
            </h1>
            <p className="mt-3 text-sm text-arzens-text-muted">
              Sign in to approve or reject ambassador and internship requests.
            </p>
          </div>

          {error ? (
            <div className="mb-6 rounded-lg border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label-mono block mb-2">ADMIN EMAIL</label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                placeholder="admin@thearzens.tech"
                required
              />
            </div>

            <div>
              <label className="label-mono block mb-2">PASSWORD</label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="bg-arzens-bg border-white/10 text-arzens-text placeholder:text-arzens-text-muted/50 focus:border-arzens-accent"
                placeholder="Enter admin password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={authLoading}
              className="w-full bg-arzens-accent text-white hover:bg-arzens-accent/90 disabled:opacity-60"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              {authLoading ? 'Signing in...' : 'Enter Dashboard'}
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-arzens-bg px-[6vw] py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-arzens-bg-secondary p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="label-mono block mb-3">ADMIN CONTROL CENTER</span>
            <h1 className="text-4xl font-heading font-bold text-arzens-text">
              Application <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="mt-2 text-sm text-arzens-text-muted">
              Manage candidate decisions and trigger approval or rejection emails.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => void loadApplications()}
              className="border border-white/10 bg-arzens-bg text-arzens-text hover:border-arzens-accent/50 hover:bg-white/5"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              className="bg-transparent text-arzens-text hover:bg-white/5 border border-white/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-8">
          <div className="rounded-xl border border-white/10 bg-arzens-bg-secondary p-5">
            <p className="label-mono mb-2">TOTAL</p>
            <p className="text-3xl font-heading font-bold text-arzens-text">{counts.total}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-arzens-bg-secondary p-5">
            <p className="label-mono mb-2">PENDING</p>
            <p className="text-3xl font-heading font-bold text-arzens-text">{counts.pending}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-arzens-bg-secondary p-5">
            <p className="label-mono mb-2">APPROVED</p>
            <p className="text-3xl font-heading font-bold text-arzens-text">{counts.approved}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-arzens-bg-secondary p-5">
            <p className="label-mono mb-2">AMBASSADOR</p>
            <p className="text-3xl font-heading font-bold text-arzens-text">{counts.ambassador}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-arzens-bg-secondary p-5">
            <p className="label-mono mb-2">INTERNSHIP</p>
            <p className="text-3xl font-heading font-bold text-arzens-text">{counts.internship}</p>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-6 rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            {success}
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-52 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-52 animate-pulse rounded-2xl bg-white/5" />
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-arzens-bg-secondary p-10 text-center text-arzens-text-muted">
            No applications found yet.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {applications.map((application) => {
              const details = summarizeRoleData(application);
              const isUpdating = submittingId === application._id;

              return (
                <article key={application._id} className="rounded-2xl border border-white/10 bg-arzens-bg-secondary p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] ${STATUS_STYLES[application.status || 'pending'] || STATUS_STYLES.pending}`}>
                          {application.status || 'pending'}
                        </span>
                        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] text-arzens-text-muted">
                          {application.role || 'unknown'}
                        </span>
                      </div>
                      <h2 className="text-2xl font-heading font-semibold text-arzens-text">
                        {application.name || 'Unnamed applicant'}
                      </h2>
                      <p className="mt-1 text-sm text-arzens-text-muted">{application.email || '-'}</p>
                    </div>
                    <div className="text-right text-xs font-mono text-arzens-text-muted">
                      <div>{formatDate(application.createdAt)}</div>
                      <div className="mt-1">ID: {application._id.slice(-6)}</div>
                    </div>
                  </div>

                  <div className="mb-5 grid gap-3 sm:grid-cols-2">
                    {details.slice(0, 6).map((detail) => (
                      <div key={detail.key} className="rounded-lg border border-white/10 bg-arzens-bg p-3">
                        <p className="label-mono mb-1">{detail.key}</p>
                        <p className="text-sm text-arzens-text">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {details.length > 6 ? (
                      <Textarea
                        readOnly
                        value={details.slice(6).map((detail) => `${detail.key}: ${detail.value}`).join('\n')}
                        className="min-h-[96px] bg-arzens-bg border-white/10 text-arzens-text"
                      />
                    ) : null}

                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={() => void handleStatusUpdate(application._id, 'approved')}
                        disabled={isUpdating || application.status === 'approved'}
                        className="bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25 border border-emerald-400/30 disabled:opacity-50"
                      >
                        {isUpdating ? 'Updating...' : <><CheckCircle2 className="mr-2 h-4 w-4" />Approve</>}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => void handleStatusUpdate(application._id, 'rejected')}
                        disabled={isUpdating || application.status === 'rejected'}
                        className="bg-red-500/15 text-red-100 hover:bg-red-500/25 border border-red-400/30 disabled:opacity-50"
                      >
                        {isUpdating ? 'Updating...' : <><XCircle className="mr-2 h-4 w-4" />Reject</>}
                      </Button>
                      <div className="ml-auto flex items-center gap-2 text-xs text-arzens-text-muted">
                        <BriefcaseBusiness className="h-4 w-4 text-arzens-accent" />
                        Review before making a final decision
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}