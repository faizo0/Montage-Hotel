import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/buttons/Button';
import { TMMonogram } from '@/assets/logo/TMMonogram';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/routes/routePaths';
import { cn } from '@/utils/cn';

export function Login() {
  const navigate = useNavigate();
  const [roleMode, setRoleMode] = useState('guest');
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !accessCode.trim()) {
      setError('Please enter your registered email and access passphrase.');
      return;
    }
    setError('');
    navigate(roleMode === 'admin' ? ADMIN_ROUTES.DASHBOARD : PUBLIC_ROUTES.GUEST_PORTAL);
  };

  return (
    <PageShell
      kicker="Private Access"
      title="Member & Executive Sign In"
      description="Frontend access gateway for resident guest stay portals and executive hospitality operations."
      primaryActionLabel="Open Guest Portal"
      primaryActionTo={PUBLIC_ROUTES.GUEST_PORTAL}
      secondaryActionLabel="Executive Dashboard"
      secondaryActionTo={ADMIN_ROUTES.DASHBOARD}
    >
      <div className="mx-auto max-w-2xl rounded-[16px] border border-[#E3D5CE] bg-white p-8 sm:p-10 shadow-[0_6px_26px_-16px_rgba(41,35,42,0.14)]">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#E3D5CE] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <TMMonogram size={42} variant="gold" />
            <div>
              <p className="font-editorial text-xl font-medium text-[#29232A]">
                The Montage Access
              </p>
              <p className="text-xs text-[#877B80]">
                Select portal destination to continue
              </p>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Access Portal Mode"
            className="inline-flex rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={roleMode === 'guest'}
              onClick={() => setRoleMode('guest')}
              className={cn(
                'rounded-[8px] px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer',
                roleMode === 'guest'
                  ? 'bg-[#702D43] text-white shadow-sm'
                  : 'text-[#5B5258] hover:text-[#29232A]'
              )}
            >
              Guest Portal
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={roleMode === 'admin'}
              onClick={() => setRoleMode('admin')}
              className={cn(
                'rounded-[8px] px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer',
                roleMode === 'admin'
                  ? 'bg-[#702D43] text-white shadow-sm'
                  : 'text-[#5B5258] hover:text-[#29232A]'
              )}
            >
              Management
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="guest@domain.com"
              className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-4 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="login-passcode"
              className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
            >
              Passphrase or Confirmation Code
            </label>
            <input
              id="login-passcode"
              type="password"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••••••••"
              className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-4 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-[#9E3B33]">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
            <span className="inline-flex items-center gap-2 text-xs text-[#877B80]">
              {roleMode === 'admin' ? (
                <ShieldCheck className="h-4 w-4 text-[#702D43]" aria-hidden="true" />
              ) : (
                <KeyRound className="h-4 w-4 text-[#702D43]" aria-hidden="true" />
              )}
              <span>
                {roleMode === 'admin'
                  ? 'Executive Operations Preview'
                  : 'Resident Stay Sanctuary'}
              </span>
            </span>

            <Button type="submit" variant="primary" size="md" icon={ArrowRight} magnetic>
              Continue to {roleMode === 'admin' ? 'Console' : 'Portal'}
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

export default Login;
