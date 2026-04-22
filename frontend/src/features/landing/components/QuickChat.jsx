import { useEffect, useMemo, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/context/AuthContext';
import { aiApi } from '../api/aiApi';

const HISTORY_WINDOW = 10;

const ROBOT_IMAGE =
  'https://api.dicebear.com/7.x/bottts/svg?seed=nova&backgroundColor=b6e3f4';

const GUEST_PROMPTS = [
  'What is this project?',
  'How do I get started?',
  'Pricing & plans',
];

const USER_PROMPTS = [
  'What info do you have about me?',
  'When did I sign up?',
  'Is my Google account linked?',
];

export default function QuickChat({ open, onClose }) {
  const { user } = useAuth() ?? {};
  const isAuthenticated = Boolean(user);

  const initialMessages = useMemo(
    () => [
      {
        id: 'welcome',
        role: 'assistant',
        text: isAuthenticated
          ? `Hi ${user.name?.split(' ')[0] || 'there'}! I'm Nova. Ask me about the project or your account.`
          : "Hi there! I'm Nova, your AI guide. Ask me anything about the project.",
      },
    ],
    [isAuthenticated, user?.name],
  );

  const quickPrompts = isAuthenticated ? USER_PROMPTS : GUEST_PROMPTS;

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const send = async (text) => {
    const value = (text ?? input).trim();
    if (!value || isSending) return;

    const userMsg = { id: crypto.randomUUID(), role: 'user', text: value };
    const typingId = crypto.randomUUID();

    const history = messages
      .filter((m) => m.id !== 'welcome')
      .slice(-HISTORY_WINDOW)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((m) => [
      ...m,
      userMsg,
      { id: typingId, role: 'assistant', text: '', typing: true },
    ]);
    setInput('');
    setIsSending(true);

    try {
      const { data } = await aiApi.sendMessage(value, history, {
        authenticated: isAuthenticated,
      });
      setMessages((m) =>
        m.map((msg) =>
          msg.id === typingId
            ? { ...msg, text: data?.reply ?? '', typing: false }
            : msg,
        ),
      );
    } catch (err) {
      const serverMsg = err?.response?.data?.error;
      const fallback = "Sorry, I couldn't reach the assistant. Please try again.";
      setMessages((m) =>
        m.map((msg) =>
          msg.id === typingId
            ? {
                ...msg,
                text: serverMsg || fallback,
                typing: false,
                error: true,
              }
            : msg,
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="AI quick chat"
      aria-hidden={!open}
      className={cn(
        'fixed right-8 bottom-32 z-50 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right transition-all duration-200',
        open
          ? 'pointer-events-auto opacity-100 scale-100 translate-y-0'
          : 'pointer-events-none opacity-0 scale-95 translate-y-2'
      )}
    >
      <div className="overflow-hidden rounded-xl bg-[#1d1d1f]/95 text-white shadow-[0_5px_30px_3px_rgba(0,0,0,0.22)] backdrop-blur-xl backdrop-saturate-180 ring-1 ring-white/10">
        <div className="relative flex items-center gap-3 border-b border-white/5 bg-[#272729] px-4 py-3">
          <Avatar size="default" className="size-9 bg-white">
            <AvatarImage src={ROBOT_IMAGE} alt="" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[15px] font-semibold leading-none tracking-tight">
              Nova
            </p>
            <p className="mt-1.5 text-xs leading-none tracking-tight text-white/60">
             <span className="text-green-500/60">Online</span> · replies instantly
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="grid size-8 cursor-pointer place-items-center rounded-full text-white/70 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex max-h-72 min-h-40 flex-col gap-2 overflow-y-auto bg-[#1d1d1f] px-4 py-3"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'max-w-[85%] rounded-lg px-3 py-2 text-[14px] leading-snug tracking-[-0.224px]',
                m.role === 'assistant'
                  ? 'self-start bg-[#2a2a2d] text-white'
                  : 'self-end bg-[#0071e3] text-white',
                m.error && 'bg-[#2a2a2d] text-white/80'
              )}
            >
              {m.typing ? (
                <span className="flex items-center gap-1 py-1">
                  <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-white/60" />
                </span>
              ) : (
                m.text
              )}
            </div>
          ))}
        </div>

        {messages.length <= 1 && !isSending && (
          <div className="flex flex-wrap gap-1.5 bg-[#1d1d1f] px-4 pb-3">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                disabled={isSending}
                className="cursor-pointer rounded-full bg-transparent px-3 py-1 text-xs tracking-[-0.12px] text-[#2997ff] ring-1 ring-[#2997ff]/60 transition hover:bg-[#2997ff]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 border-t border-white/5 bg-[#1d1d1f] p-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isSending ? 'Nova is thinking…' : 'Ask me anything…'}
            disabled={isSending}
            maxLength={500}
            className="flex-1 rounded-[11px] bg-[#262628] px-4 py-2 text-[14px] tracking-[-0.224px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0071e3] disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || isSending}
            className="grid size-9 cursor-pointer place-items-center rounded-full bg-[#0071e3] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d1d1f]"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
