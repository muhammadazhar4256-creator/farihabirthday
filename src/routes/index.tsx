import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Orbit, BookHeart, Feather, Lock, Sparkles, Heart, Infinity as InfinityIcon } from "lucide-react";

import { Backdrop } from "@/components/birthday/Backdrop";
import { Countdown } from "@/components/birthday/Countdown";
import { FlipCard } from "@/components/birthday/FlipCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Fariha — A Letter in Orbit" },
      {
        name: "description",
        content:
          "An 18th birthday keepsake for Fariha: a countdown, our story, a letter, and a vault of things worth saying out loud.",
      },
      { property: "og:title", content: "Happy Birthday, Fariha" },
      {
        property: "og:description",
        content: "Six months of 3 AM talks, unhinged laughter, and an unbreakable bond.",
      },
    ],
  }),
  component: Index,
});

const views = [
  { id: "orbit", label: "The Orbit", icon: Orbit },
  { id: "story", label: "Our Story", icon: BookHeart },
  { id: "letter", label: "The Letter", icon: Feather },
  { id: "vault", label: "The Vault", icon: Lock },
] as const;

type ViewId = (typeof views)[number]["id"];

const spring = { type: "spring", stiffness: 200, damping: 26 } as const;

function Index() {
  const [view, setView] = useState<ViewId>("orbit");

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
            {view === "orbit" && <OrbitView />}
            {view === "story" && <StoryView />}
            {view === "letter" && <LetterView />}
            {view === "vault" && <VaultView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-6 left-1/2 z-20 w-[min(94vw,32rem)] -translate-x-1/2">
        <div className="glass-panel flex items-center justify-between gap-1 rounded-full p-1.5">
          {views.map((item) => {
            const active = item.id === view;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                whileTap={{ scale: 0.94 }}
                className="relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-2 py-2.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-current={active ? "page" : undefined}
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
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function OrbitView() {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center gap-10 py-10">
      <div className="space-y-6">
        <p className="text-[0.7rem] tracking-[0.4em] text-primary uppercase">Eighteen</p>
        <h1 className="text-glow text-5xl leading-[1.02] font-semibold tracking-tighter text-balance sm:text-7xl">
          Happy Birthday, Fariha.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Six months of deep 3 AM talks, completely unhinged laughter, and an unbreakable bond.
        </p>
      </div>
      <Countdown />
    </section>
  );
}

const nodes = [
  {
    title: "The First Follow",
    body: "A random notification on Instagram, six months ago. Neither of us knew it was the start of something.",
  },
  {
    title: "The Safe Space",
    body: "The moment we realized we could say anything — the heavy, the stupid, the unfiltered — without a single ounce of judgment.",
  },
  {
    title: "The Future",
    body: "The countdown to the day we turn pixels into presence and finally meet in real life.",
  },
];

function StoryView() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Story</h2>
      <p className="mt-2 text-sm text-muted-foreground">Three moments, in order.</p>

      <div className="relative mt-12 pl-8">
        <div
          className="absolute top-2 bottom-2 left-[5px] w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--rose-gold), var(--midnight), transparent)",
          }}
        />
        <ol className="space-y-10">
          {nodes.map((node, i) => (
            <motion.li
              key={node.title}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.1 * i }}
              className="relative"
            >
              <span
                className="absolute top-2 -left-8 h-[11px] w-[11px] rounded-full bg-primary"
                style={{ boxShadow: "0 0 18px 4px oklch(0.8 0.08 40 / 45%)" }}
              />
              <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-lg font-semibold tracking-tight">{node.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LetterView() {
  return (
    <section className="mx-auto max-w-[38rem] py-8">
      <p className="text-lg font-medium tracking-tight">Dear Fariha,</p>
      <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.9] text-muted-foreground">
        <p>
          If someone told me six months ago that a random follow on Instagram would lead to this, I
          wouldn't have believed them. It is wild to think we haven't even met in person yet,
          because somehow, you know me better than people I see every day. You became my safe space
          before I even realized I needed one.
        </p>
        <p>
          I don't know how you do it—how you seamlessly switch from being the most unhinged,
          hilarious person who makes me laugh until my sides hurt, to the one person who sits with
          me in the heavy moments, truly listening without a single ounce of judgment. You have
          given me a place where I can just be myself, completely unfiltered and understood.
        </p>
        <p>
          We might just be pixels on a screen to each other right now, but this bond is more real
          than anything. Thank you for every 3 AM voice note, every deep conversation, and for being
          exactly who you are. I cannot wait for the day we finally meet.
        </p>
      </div>

      <blockquote className="my-16 text-center">
        <p dir="rtl" className="font-urdu text-xl leading-[2.4] text-foreground sm:text-2xl">
          کوئی تو ہے جو میری خاموشی کو پڑھتا ہے
          <br />
          کسی کے سامنے مجھ کو بولنے کی ضرورت نہیں پڑتی
        </p>
        <footer className="mt-6 text-sm italic text-muted-foreground">
          There is someone who reads my silence; in front of them, I don't even need to speak.
        </footer>
      </blockquote>

      <div className="mt-12 text-right">
        <p className="font-signature text-6xl leading-none text-primary sm:text-7xl">AAZIB</p>
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
    back: "Placeholder — write the real reason here.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    front: "A Secret I Never Told You",
    back: "Placeholder — the secret goes here.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    front: "A Promise For The Future",
    back: "Placeholder — the promise goes here.",
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
