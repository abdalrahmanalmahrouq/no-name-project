import { useState } from 'react';
import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import QuickChat from './QuickChat';

const ROBOT_IMAGE =
  'https://api.dicebear.com/7.x/bottts/svg?seed=nova&backgroundColor=b6e3f4';

export default function AIAgentBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <QuickChat open={open} onClose={() => setOpen(false)} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
        className="group cursor-pointer fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-[#1d1d1f] p-2 ring-1 ring-white/10 shadow-[0_5px_30px_3px_rgba(0,0,0,0.22)] transition-all duration-200 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10 rounded-full bg-[#0071e3]/50 transition-opacity',
            open ? 'opacity-0' : 'animate-ping opacity-60 group-hover:opacity-80'
          )}
        />
        <Avatar
          size="lg"
          className={cn(
            'size-20 bg-white transition-all duration-200',
            open && 'scale-0 opacity-0'
          )}
        >
          <AvatarImage src={ROBOT_IMAGE} alt="AI assistant" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <X
          aria-hidden="true"
          className={cn(
            'absolute size-8 text-white transition-all duration-200',
            open ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'
          )}
        />
      </button>
    </>
  );
}
