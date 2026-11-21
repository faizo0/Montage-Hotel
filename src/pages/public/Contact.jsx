import React, { useState } from 'react';
import { ArrowRight, Check, Clock, Mail, Phone } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/buttons/Button';
import { HOTEL_INFO } from '@/data/hotelInfo';
import { PUBLIC_ROUTES } from '@/routes/routePaths';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !message.trim()) {
      setError('Please complete your name, email address, and inquiry message.');
      return;
    }
    setError('');
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <PageShell
      kicker="24-Hour Concierge"
      title="Concierge & Inquiries"
      description={`Reach our dedicated hospitality desk in ${HOTEL_INFO.country} at ${HOTEL_INFO.conciergeEmail} or compose an inquiry below.`}
      primaryActionLabel="Reserve a Stay"
      primaryActionTo={PUBLIC_ROUTES.BOOKING}
      secondaryActionLabel="Explore Suites"
      secondaryActionTo={PUBLIC_ROUTES.ROOMS}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6 rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 p-8 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)]">
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
              <p className="editorial-kicker">Direct Desk</p>
            </div>
            <h2 className="display-card">{HOTEL_INFO.brandName}</h2>
          </div>

          <div className="space-y-4 border-t border-[#E3D5CE] pt-5 text-sm text-[#5B5258]">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#702D43]" aria-hidden="true" />
              <div>
                <p className="font-medium text-[#29232A]">Concierge Mail</p>
                <p>{HOTEL_INFO.conciergeEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#702D43]" aria-hidden="true" />
              <div>
                <p className="font-medium text-[#29232A]">Reservations Line</p>
                <p>{HOTEL_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#702D43]" aria-hidden="true" />
              <div>
                <p className="font-medium text-[#29232A]">Check-In & Check-Out</p>
                <p className="tabular-nums">
                  {HOTEL_INFO.checkIn} · {HOTEL_INFO.checkOut}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 rounded-[16px] border border-[#E3D5CE] bg-white p-8 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)] space-y-5"
        >
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
              <p className="editorial-kicker">Private Message</p>
            </div>
            <h2 className="display-card">Write to Our Concierge</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                  if (sent) setSent(false);
                }}
                placeholder="Tariq Mahmood"
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                  if (sent) setSent(false);
                }}
                placeholder="guest@domain.com"
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
            >
              Inquiry Details
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError('');
                if (sent) setSent(false);
              }}
              placeholder="Share preferred suite dates, dining reservations, or celebration plans..."
              className="w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] p-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-[#9E3B33]">
              {error}
            </p>
          )}

          {sent && (
            <p
              role="status"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#E9DDE0] px-3.5 py-2.5 text-xs font-medium text-[#702D43]"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              <span>Your inquiry has been logged for our concierge desk.</span>
            </p>
          )}

          <div className="pt-1">
            <Button type="submit" variant="primary" size="md" icon={ArrowRight} magnetic>
              Send Inquiry
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

export default Contact;
