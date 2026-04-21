import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  UserRound,
  ArrowRight,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const SERVICES = [
  {
    icon: Sparkles,
    title: 'Nova, your AI guide',
    description:
      'An always-on assistant that answers product questions, explains features, and helps users get unstuck — in plain language.',
    href: '/',
    cta: 'Try the assistant',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description:
      'Email sign-in, Google OAuth, password recovery, and verified sessions. Authentication that protects without getting in the way.',
    href: '/register',
    cta: 'Create an account',
  },
  {
    icon: UserRound,
    title: 'Your profile, your control',
    description:
      'Manage your identity, avatar, and credentials from a single place. Clear controls for the things that actually matter.',
    href: '/profile',
    cta: 'Manage profile',
  },
  {
    icon: LayoutDashboard,
    title: 'A focused workspace',
    description:
      'A calm dashboard designed for speed and clarity. No clutter, no noise — just the tools you came for.',
    href: '/dashboard',
    cta: 'Open dashboard',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative min-h-screen w-full px-6 py-24 scroll-mt-14 sm:py-32"
    >
      <div className="mx-auto max-w-[980px]">
        {/* Eyebrow */}
        <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] text-[#2997ff]">
          Services
        </p>

        {/* Headline */}
        <h2
          className="mt-4 text-center font-semibold text-white"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.07,
            letterSpacing: '-0.28px',
          }}
        >
          Everything you need.
          <br />
          Nothing you don&apos;t.
        </h2>

        {/* Subtitle */}
        <p
          className="mx-auto mt-6 max-w-[640px] text-center text-white/80"
          style={{
            fontSize: '21px',
            lineHeight: 1.19,
            letterSpacing: '0.011em',
          }}
        >
          Four pieces, one product. Each one built with restraint, designed to
          stay out of your way until you need it.
        </p>

        {/* Services grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description, href, cta }) => (
            <article
              key={title}
              className={cn(
                'group relative flex flex-col rounded-[12px] bg-white p-8',
                'shadow-[rgba(0,0,0,0.06)_0px_1px_3px_0px]',
                'transition-shadow duration-300',
                'hover:shadow-[rgba(0,0,0,0.22)_3px_5px_30px_0px]'
              )}
            >
              <div
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-[#0071e3]/10 text-[#0071e3]"
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </div>

              <h3
                className="mt-6 font-semibold text-[#1d1d1f]"
                style={{
                  fontSize: '21px',
                  lineHeight: 1.19,
                  letterSpacing: '0.011em',
                }}
              >
                {title}
              </h3>

              <p
                className="mt-3 flex-1 text-[#1d1d1f]/80"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.47,
                  letterSpacing: '-0.022em',
                }}
              >
                {description}
              </p>

              <Link
                to={href}
                className={cn(
                  'mt-6 inline-flex items-center gap-1.5 self-start',
                  'text-[14px] font-normal text-[#0066cc]',
                  'tracking-[-0.224px]',
                  'hover:underline underline-offset-4'
                )}
              >
                {cta}
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
