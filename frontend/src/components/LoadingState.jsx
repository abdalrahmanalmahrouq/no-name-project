export default function LoadingState() {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[78px] rounded-[12px] bg-[#f5f5f7] dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }