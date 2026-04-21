import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
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
