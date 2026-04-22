import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
import PomodoroTimer from "../components/PomodoroTimer";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const nodes = [
  {
    id: "1",
    data: { label: "Supervised learning" },
    position: { x: 0, y: 0 },
    style: {
      background: "rgba(255,255,255,0.04)",
      color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 999,
      paddingInline: 16,
      paddingBlock: 6,
      fontSize: 11
    }
  },
  {
    id: "2",
    data: { label: "Loss functions" },
    position: { x: -80, y: 90 },
    style: {
      background: "rgba(255,255,255,0.04)",
      color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 999,
      paddingInline: 12,
      paddingBlock: 5,
      fontSize: 11
    }
  },
  {
    id: "3",
    data: { label: "Optimization" },
    position: { x: 80, y: 90 },
    style: {
      background: "rgba(255,255,255,0.04)",
      color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 999,
      paddingInline: 12,
      paddingBlock: 5,
      fontSize: 11
    }
  }
];

const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true }
];

export default function StudyMode() {
  const flashcards = [
    {
      front: "Define bias-variance tradeoff.",
      back: "Tradeoff between error from erroneous assumptions (bias) and error from sensitivity to fluctuations in the training set (variance)."
    },
    {
      front: "Why is regularization used?",
      back: "To discourage overly complex models, reduce variance, and improve generalization."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Study mode<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Distraction-free workspace: Pomodoro, notes, flashcards, and a concept map.
          </p>
        </div>
        <Button variant="secondary" as="a" href="/dashboard" className="hidden md:inline-flex">
          Back to dashboard
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
        <div className="space-y-4">
          <PomodoroTimer />
          <GlassPanel className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Notes
              </h2>
              <span className="text-xs text-slate-500">Auto-save later</span>
            </div>
            <textarea
              rows={9}
              className="focus-ring w-full rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 resize-none"
              placeholder="Capture definitions, derivations, and edge cases..."
            />
          </GlassPanel>
        </div>

        <div className="space-y-4">
          <GlassPanel className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Flashcards
              </h2>
              <span className="text-xs text-slate-500">Active recall</span>
            </div>

            <div className="space-y-3">
              {flashcards.map((card, idx) => (
                <motion.details
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <summary className="cursor-pointer text-sm text-slate-100 font-medium">
                    {card.front}
                  </summary>
                  <p className="mt-2 text-sm text-slate-400">{card.back}</p>
                </motion.details>
              ))}
            </div>
          </GlassPanel>

          <SurfaceCard className="h-72 overflow-hidden">
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <MiniMap />
              <Controls />
              <Background gap={14} color="rgba(255,255,255,0.06)" />
            </ReactFlow>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}

