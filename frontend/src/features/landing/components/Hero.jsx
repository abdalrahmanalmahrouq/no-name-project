import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2400&q=80';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"
      />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-white font-semibold tracking-tight text-5xl sm:text-6xl leading-[1.07] drop-shadow-sm">
          No-Name Project
        </h1>

        <p className="mt-5 max-w-xl text-lg sm:text-xl font-normal text-white/85">
          A simple, modern workspace built for focus and speed.
        </p>

        <Button asChild variant="hero" size="pill" className="mt-10">
          <Link to="/login">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
