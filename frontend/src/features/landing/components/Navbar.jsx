import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const SCROLL_THRESHOLD = 40;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToId(href.slice(1));
  };

  const handleBrand = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '/');
  };

  const surfaceClasses = scrolled || mobileOpen
    ? 'bg-black/80 backdrop-blur-xl backdrop-saturate-[180%] border-b border-white/10'
    : 'bg-transparent border-b border-transparent';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40',
        'transition-[background-color,backdrop-filter,border-color] duration-300 ease-out',
        surfaceClasses,
      )}
    >
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <a
          href="/"
          onClick={handleBrand}
          className="text-[15px] font-semibold tracking-[-0.374px] text-white"
        >
          No-Name Project
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleAnchor(e, href)}
              className={cn(
                'rounded-full px-3 py-1.5',
                'text-[14px] font-normal tracking-[-0.224px]',
                'text-white/80 transition hover:text-white hover:bg-white/10',
              )}
            >
              {label}
            </a>
          ))}

          <Link
            to="/login"
            className={cn(
              'ml-2 rounded-full px-3 py-1.5',
              'text-[14px] font-normal tracking-[-0.224px]',
              'text-white/80 transition hover:text-white hover:bg-white/10',
            )}
          >
            Sign In
          </Link>

          <Button
            asChild
            variant="hero"
            size="pill"
            className="ml-1 h-9 px-5 py-0 text-[14px]"
          >
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden grid size-9 cursor-pointer place-items-center rounded-full text-white/80 transition hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="flex flex-col gap-1 px-6 pb-4 pt-2">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleAnchor(e, href)}
              className="rounded-lg px-3 py-2 text-[15px] font-medium tracking-[-0.374px] text-white/80 hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-white/25 px-4 py-2 text-center text-[14px] font-normal tracking-[-0.224px] text-white hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-[#0071e3] px-4 py-2 text-center text-[14px] font-normal tracking-[-0.224px] text-white hover:bg-[#0077ed]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
