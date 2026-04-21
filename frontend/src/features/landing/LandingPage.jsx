import BackgroundOverlay from '@/components/BackgroundOverlay';

import AIAgentBubble from './components/AIAgentBubble';
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Services from './components/Services';

export default function LandingPage() {
  return (
    <div className="relative">
      <BackgroundOverlay className="fixed inset-0 pointer-events-none" />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <AIAgentBubble />
    </div>
  );
}
