import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Instagram, Linkedin, Globe, Mail } from 'lucide-react';
import { TMMonogram } from '@/assets/logo/TMMonogram';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/layout/Divider';
import { Button } from '@/components/buttons/Button';
import { FOOTER_DIRECTORIES } from '@/data/navigationData';
import { HOTEL_INFO } from '@/data/hotelInfo';
import { PUBLIC_ROUTES } from '@/routes/routePaths';

/**
 * Luxury Footer — Royal Burgundy, Warm Ivory, Soft Rose Beige & Champagne Gold
 */
export function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setNewsletterError('Please enter a valid email address.');
      setSubscribed(false);
      return;
    }

    setNewsletterError('');
    setSubscribed(true);
    setEmail('');
  };

  const socialLinks = [
    { label: 'Instagram', href: '#instagram', Icon: Instagram },
    { label: 'LinkedIn', href: '#linkedin', Icon: Linkedin },
    { label: 'Architectural Gallery', href: PUBLIC_ROUTES.GALLERY, Icon: Globe, isInternal: true },
    { label: 'Concierge Mail', href: PUBLIC_ROUTES.CONTACT, Icon: Mail, isInternal: true },
  ];

  return (
    <footer className="border-t border-[#E3D5CE] bg-[#E9DDE0]/45 text-[#29232A]">
      <Container className="py-16 md:py-20">
        {/* Top Row: Brand Story + Newsletter Subscription */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#E3D5CE] pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6 space-y-4">
            <Link to={PUBLIC_ROUTES.HOME} className="inline-flex items-center gap-3.5 group">
              <TMMonogram size={46} variant="gold" />
              <div>
                <p className="font-editorial text-2xl font-medium tracking-tight text-[#29232A] group-hover:text-[#702D43] transition-colors">
                  {HOTEL_INFO.brandName}
                </p>
                <p className="text-xs text-[#997A46] tracking-[0.14em] uppercase font-medium">
                  {HOTEL_INFO.country} · Five-Star Luxury Hospitality
                </p>
              </div>
            </Link>

            <p className="text-sm text-[#5B5258] leading-relaxed max-w-md">
              {HOTEL_INFO.tagline}. Crafted in sculpted marble, carved timber,
              and tranquil courtyard gardens to deliver heartfelt Pakistani
              hospitality.
            </p>
          </div>

          {/* Newsletter Subscription UI */}
          <div className="lg:col-span-6">
            <div className="rounded-[14px] border border-[#E3D5CE] bg-[#F8F3EA] p-6 sm:p-7 shadow-[0_14px_34px_-22px_rgba(41,35,42,0.14)]">
              <p className="editorial-kicker mb-1.5">Private Dispatches</p>
              <p className="text-sm text-[#5B5258] mb-4">
                Receive seasonal invitations, culinary evenings, and private suite privileges.
              </p>

              <form onSubmit={handleSubscribe} noValidate className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                      if (subscribed) setSubscribed(false);
                    }}
                    placeholder="guest@domain.com"
                    className="h-[44px] w-full rounded-[10px] border border-[#E3D5CE] bg-white px-4 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  Subscribe
                </Button>
              </form>

              {newsletterError && (
                <p role="alert" className="mt-2.5 text-xs font-medium text-[#9E3B33]">
                  {newsletterError}
                </p>
              )}

              {subscribed && (
                <p
                  role="status"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#702D43]"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Thank you. Your invitation preferences have been registered.</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Middle Row: Contact + Directories */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43] mb-3">
                Concierge & Inquiries
              </h3>
              <div className="space-y-1.5 text-sm text-[#5B5258]">
                <p>{HOTEL_INFO.location}</p>
                <p>{HOTEL_INFO.phone}</p>
                <p>{HOTEL_INFO.conciergeEmail}</p>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43] mb-3">
                Connect
              </h3>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.Icon;
                  const sharedClasses =
                    'inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] text-[#702D43] hover:bg-[#702D43] hover:border-[#C6A46A] hover:text-white hover:-translate-y-[1px] transition-all duration-200 shadow-[0_2px_6px_rgba(41,35,42,0.04)]';
                  return social.isInternal ? (
                    <Link
                      key={social.label}
                      to={social.href}
                      aria-label={social.label}
                      className={sharedClasses}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      key={social.label}
                      href={social.href}
                      onClick={(e) => e.preventDefault()}
                      aria-label={social.label}
                      className={sharedClasses}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_DIRECTORIES.map((section) => (
              <div key={section.heading}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43] mb-4">
                  {section.heading}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-[#5B5258] hover:text-[#702D43] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Divider ornate className="my-10" />

        <div className="flex flex-col gap-3 text-xs text-[#877B80] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {HOTEL_INFO.brandName}. All rights reserved.
          </p>
          <p className="tabular-nums">
            Check-In {HOTEL_INFO.checkIn} · Check-Out {HOTEL_INFO.checkOut} · {HOTEL_INFO.country}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
