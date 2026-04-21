import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

export default function BackToHomeButton({ className, to = '/' }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      aria-label="Back to home"
      title="Back to home"
      className={cn(
        'absolute top-3 left-3 z-10',
        'grid size-9 cursor-pointer place-items-center rounded-full',
        'bg-[#fafafc] text-[#0066cc]',
        'transition-colors hover:bg-[#ededf2]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]',
        className,
      )}
    >
      <ArrowLeft className="size-4" strokeWidth={2} />
    </button>
  );
}
