import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Orbit, Sigma, Feather, Lock, Sparkles, Heart, Infinity as InfinityIcon } from "lucide-react";

import { Backdrop } from "@/components/birthday/Backdrop";
import { Countdown, useCountdown } from "@/components/birthday/Countdown";
import { FlipCard } from "@/components/birthday/FlipCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Fariha — A Letter in Orbit" },
      {
        name: "description",
        content:
          "An 18th birthday keepsake for Fariha: a countdown, the odds of finding her, a letter, and a vault of things worth saying out loud.",
      },
      { property: "og:title", content: "Happy Birthday, Fariha" },
      {
        property: "og:description",
        content: "Deep 3 AM talks, completely unhinged laughter, and an unbreakable bond.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Happy Birthday, Fariha" },
    ],
  }),
  component: Index,
});

const views = [
  { id: "orbit", label: "The Orbit", icon: Orbit, locked: false },
  { id: "odds", label: "The Odds", icon: Sigma, locked: true },
  { id: "letter", label: "The Letter", icon: Feather, locked: true },
  { id: "vault", label: "The Vault", icon: Lock, locked: true },
] as const;

type ViewId = (typeof views)[number]["id"];

const spring = { type: "spring", stiffness: 200, damping: 26 } as const;

function Index() {
  const time = useCountdown();
  const [view, setView] = useState<ViewId>("orbit");
  const [previewUnlock, setPreviewUnlock] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [shake, setShake] = useState(0);

  const unlocked = time.done || previewUnlock;

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), 2800);
    return () => clearTimeout(id);
  }, [notice]);

  function handleSelect(item: (typeof views)[number]) {
    if (item.locked && !unlocked) {
      setNotice("This chapter unlocks at midnight on September 27.");
      setShake((s) => s + 1);
      return;
    }
    setView(item.id);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden pb-36">
      <Backdrop />

      <main className="mx-auto w-full max-w-3xl px-5 pt-20 sm:px-8 sm:pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={spring}
          >
            {view === "orbit" && <OrbitView time={time} unlocked={unlocked} />}
            {view === "odds" && <OddsView />}
            {view === "letter" && <LetterView />}
            {view === "vault" && <VaultView />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 flex justify-center">
          <button
            type="button"
            onClick={() => setPreviewUnlock((v) => !v)}
            className="text-[0.6rem] tracking-[0.25em] text-muted-foreground/40 uppercase transition-colors hover:text-muted-foreground"
          >
            {previewUnlock ? "preview mode on" : "preview"}
          </button>
        </div>
      </main>

      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={spring}
            className="fixed bottom-24 left-1/2 z-30 w-[min(90vw,24rem)] -translate-x-1/2"
          >
            <div className="glass-panel flex items-center gap-3 rounded-3xl px-5 py-4">
              <Lock className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground">{notice}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-6 left-1/2 z-20 w-[min(94vw,32rem)] -translate-x-1/2">
        <motion.div
          key={shake}
          animate={shake ? { x: [0, -7, 7, -4, 0] } : undefined}
          transition={{ duration: 0.4 }}
          className="glass-panel flex items-center justify-between gap-1 rounded-full p-1.5"
        >
          {views.map((item) => {
            const active = item.id === view;
            const isLocked = item.locked && !unlocked;
            const Icon = isLocked ? Lock : item.icon;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                whileTap={{ scale: 0.94 }}
                className="relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-2 py-2.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-current={active ? "page" : undefined}
                aria-disabled={isLocked}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-full bg-secondary/80"
                  />
                )}
                <span
                  className={`relative flex items-center gap-2 text-xs font-medium tracking-tight transition-colors ${
                    isLocked
                      ? "text-muted-foreground/40"
                      : active
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </nav>
    </div>
  );
}

function OrbitView({
  time,
  unlocked,
}: {
  time: ReturnType<typeof useCountdown>;
  unlocked: boolean;
}) {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center gap-10 py-10">
      <div className="space-y-6">
        <p className="text-[0.7rem] tracking-[0.4em] text-primary uppercase">Eighteen</p>
        <h1 className="text-glow text-5xl leading-[1.02] font-semibold tracking-tighter text-balance sm:text-7xl">
          Happy Birthday, Fariha.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Countless deep 3 AM talks, completely unhinged laughter, and an unbreakable bond.
        </p>
      </div>
      <Countdown time={time} />
      <p className="text-center text-[0.65rem] tracking-[0.25em] text-muted-foreground/60 uppercase">
        {unlocked
          ? "Everything is unlocked — go look around"
          : "Three chapters unlock at midnight"}
      </p>
    </section>
  );
}

const metrics = [
  {
    value: "8,100,000,000",
    label: "The World",
    body: "Human beings currently sharing this planet.",
  },
  {
    value: "1 Notification",
    label: "The Catalyst",
    body: "A random follow out of nowhere that could have easily been ignored, but changed everything instead.",
  },
  {
    value: "0.00 Miles",
    label: "The Distance",
    body: "Distance between screens, but zero distance between souls.",
  },
];

function OddsView() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">The Odds</h2>
      <p className="mt-2 text-sm text-muted-foreground">Statistically impossible. Yet here you are.</p>

      <div className="mt-10 space-y-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.08 * i }}
            className="glass-panel rounded-3xl p-6"
          >
            <p className="text-[0.65rem] tracking-[0.3em] text-primary uppercase">{m.label}</p>
            <p className="text-glow mt-3 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
              {m.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.3 }}
          className="glass-panel rounded-3xl p-7"
        >
          <p className="text-[0.65rem] tracking-[0.3em] text-primary uppercase">The Result</p>
          <p className="text-glow mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">
            1 in 8.1 Billion
          </p>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Out of all the people this world has created, with all the roads I could have taken
              and all the lives I could have lived, some impossible miracle of timing allowed my
              story to cross paths with yours.
            </p>
            <p>
              The probability of finding someone on your exact chaotic frequency who also
              understands your quietest silence was virtually zero. We beat the odds.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LetterView() {
  return (
    <section className="mx-auto max-w-[38rem] py-8">
      <p className="text-lg font-medium tracking-tight">Happy Birthday, Fariha.</p>
      <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.9] text-muted-foreground">
        <p>
          I was thinking today about how crazy it is that we haven't even met in real life, yet
          you've become one of the most important people in my corner. We crossed paths on Instagram
          out of nowhere, and somehow, you quickly became my absolute best friend.
        </p>
        <p>
          Thank you for being the person I can share the heavy stuff with—the things I just can't
          say to anyone else. You listen without judging, and in a world where everyone is usually
          just pretending, having this real, unfiltered bond with you means everything to me. Even
          though there is a screen between us, your presence in my life is more real than people I
          see every single day.
        </p>
        <p>
          If someone asked me how lucky I am to have you in my life, I would say this: Out of all
          the people this world has created, with all the roads I could have taken and all the lives
          I could have lived, some impossible miracle of timing allowed my story to cross paths with
          yours. And if I spend the rest of my life searching for a word greater than 'lucky,' I
          still don't think it would be enough to explain what you are to me.
        </p>
        <p>
          I hope this year brings you exactly as much peace, success, and joy as you've brought into
          my life. We are absolutely going to celebrate this properly in person one day. Until then,
          have the most amazing birthday.
        </p>
      </div>

      <blockquote className="my-16 text-center">
        <p dir="rtl" className="font-urdu text-xl leading-[2.4] text-foreground sm:text-2xl">
          تم سے ملنا میری کسی دعا کا اثر ہے شاید
          <br />
          ورنہ اتنے خوبصورت اتفاق کہاں ہوتے ہیں
        </p>
        <footer className="mt-6 text-sm italic text-muted-foreground">
          Meeting you is perhaps the answer to some prayer of mine; otherwise, where do such
          beautiful coincidences ever happen?
        </footer>
      </blockquote>

      <div className="mt-12 text-right">
        <p className="text-sm text-muted-foreground">Always in your corner,</p>
        <p className="font-signature mt-2 text-6xl leading-none text-primary sm:text-7xl">AAZIB</p>
        <p className="mt-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Your Best Friend
        </p>
      </div>
    </section>
  );
}

const cards = [
  {
    front: "Why You're Irreplaceable",
    back: "You are the only person who can see straight through my silence. In a world where most connections stay on the surface, you make me feel understood without me ever having to explain myself. People with a heart like yours don't happen twice.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    front: "A Secret I Never Told You",
    back: "Whenever life gets heavy or everything around me feels loud and overwhelming, opening our chat is the one place where I immediately feel at peace. You brought stability into my life without even realizing you were doing it.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    front: "Until We Meet",
    back: "We might only be glowing text on a phone screen right now, but you are realer to me than people I cross paths with every day. Keep being unapologetically you—I promise our first real-life hangout will be unforgettable.",
    icon: <InfinityIcon className="h-6 w-6" />,
  },
];

function VaultView() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">The Vault</h2>
      <p className="mt-2 text-sm text-muted-foreground">Three things. Tap to open each one.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <FlipCard key={card.front} {...card} />
        ))}
      </div>
    </section>
  );
}
