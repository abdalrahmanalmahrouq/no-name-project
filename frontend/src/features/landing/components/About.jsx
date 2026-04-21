const STATS = [
  { value: '4', label: 'Integrated services' },
  { value: '100%', label: 'Secure authentication' },
  { value: '24/7', label: 'AI assistance' },
  { value: '0ms', label: 'Wasted attention' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full px-6 py-24 text-white scroll-mt-14 sm:py-32"
    >
      <div className="mx-auto max-w-[980px]">
        <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] text-[#2997ff]">
          About
        </p>

        <h2
          className="mt-4 text-center font-semibold text-white"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.07,
            letterSpacing: '-0.28px',
          }}
        >
          A calmer way to
          <br />
          build on the web.
        </h2>

        <p
          className="mx-auto mt-6 max-w-[640px] text-center text-white/80"
          style={{
            fontSize: '21px',
            lineHeight: 1.19,
            letterSpacing: '0.011em',
          }}
        >
          No-Name Project is a small, opinionated starter that pairs a focused
          dashboard with an always-on AI guide. It gets out of your way — so
          the work stays in the foreground.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-8 text-left sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="border-t border-white/15 pt-5">
              <p
                className="font-semibold text-white"
                style={{
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {value}
              </p>
              <p
                className="mt-2 text-white/60"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.29,
                  letterSpacing: '-0.224px',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
