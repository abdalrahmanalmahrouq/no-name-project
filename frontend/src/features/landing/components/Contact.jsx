import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      e.target.reset();
      toast.success('Thanks — we will get back to you soon.', {
        autoClose: 3000,
        position: 'bottom-right',
      });
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full px-6 py-24 scroll-mt-14 sm:py-32"
    >
      <div className="mx-auto max-w-[640px]">
        <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] text-[#2997ff]">
          Contact
        </p>

        <h2
          className="mt-4 text-center font-semibold text-white"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.07,
            letterSpacing: '-0.28px',
          }}
        >
          Say hello.
        </h2>

        <p
          className="mx-auto mt-6 max-w-[520px] text-center text-white/80"
          style={{
            fontSize: '21px',
            lineHeight: 1.19,
            letterSpacing: '0.011em',
          }}
        >
          Questions, feedback, or just curious about the project? Send a note
          and we&apos;ll reply shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-5 rounded-[12px] bg-white p-8 shadow-[rgba(0,0,0,0.06)_0px_1px_3px_0px]"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="What&apos;s on your mind?"
              className="w-full rounded-[11px] border border-input bg-background px-3 py-2 text-[15px] tracking-[-0.374px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <a
              href="mailto:hello@no-name.project"
              className="inline-flex items-center gap-2 text-[14px] text-[#0066cc] tracking-[-0.224px] hover:underline underline-offset-4"
            >
              <Mail className="size-4" strokeWidth={1.75} />
              hello@no-name.project
            </a>

            <Button
              type="submit"
              variant="hero"
              size="pill"
              disabled={submitting}
              className="h-10 px-6 text-[14px]"
            >
              <Send className="size-4" strokeWidth={2} />
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
