import { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

export function FlipCard({
  front,
  back,
  icon,
}: {
  front: string;
  back: string;
  icon: React.ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-scene h-72 w-full">
      <motion.button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={`${front} — tap to flip`}
        className="relative h-full w-full cursor-pointer rounded-3xl text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flip-face glass-panel absolute inset-0 flex flex-col justify-between rounded-3xl p-7">
          <span className="text-primary">{icon}</span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{front}</h3>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Tap to open
            </p>
          </div>
        </div>
        <div
          className="flip-face glass-panel absolute inset-0 flex items-center rounded-3xl p-7"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{back}</p>
        </div>
      </motion.button>
    </div>
  );
}
