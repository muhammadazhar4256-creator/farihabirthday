export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full opacity-45 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--midnight), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full opacity-35 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--rose-gold), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-52 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[160px]"
        style={{ background: "radial-gradient(circle, var(--midnight), transparent 70%)" }}
      />
    </div>
  );
}
