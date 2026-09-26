import { useEffect, useState } from "react";
import { motion } from "motion/react";

function nextTarget() {
  const now = new Date();
  const year = now.getFullYear();
  const thisYear = new Date(year, 8, 27, 0, 0, 0, 0);
  return now.getTime() <= thisYear.getTime() ? thisYear : new Date(year + 1, 8, 27, 0, 0, 0, 0);
}

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

export function useCountdown() {
  const [target] = useState(() => nextTarget().getTime());
  const [time, setTime] = useState(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  }));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return { ...time, mounted };
}

export function Countdown({
  time,
}: {
  time: ReturnType<typeof useCountdown>;
}) {
  const cells = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="w-full">
      <p className="mb-4 text-center text-[0.7rem] tracking-[0.35em] text-muted-foreground uppercase">
        {time.done ? "It's finally today" : "Counting down to September 27"}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cells.map((cell, i) => (
          <motion.div
            key={cell.label}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.08 * i }}
            className="glass-panel rounded-3xl px-4 py-5 text-center"
          >
            <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
              {time.mounted ? String(cell.value).padStart(2, "0") : "--"}
            </div>
            <div className="mt-1 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              {cell.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
