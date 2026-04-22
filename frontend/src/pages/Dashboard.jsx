import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import XPBar from "../components/XPBar";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";
import Button from "../components/ui/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { setCompletedTopics } = useProgress();
  const { user } = useAuth();

  useEffect(() => {
    setCompletedTopics([
      "Supervised vs unsupervised learning",
      "Asymptotic complexity basics",
      "Matrix multiplication and norms"
    ]);
  }, [setCompletedTopics]);

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Concept mastery",
        data: [40, 52, 63, 72],
        borderColor: "#22d3ee",
        backgroundColor: "rgba(99,102,241,0.10)",
        tension: 0.35,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
          font: { size: 10 }
        }
      },
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.9)",
        borderColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        titleColor: "#e2e8f0",
        bodyColor: "#cbd5e1",
        padding: 10
      }
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: { color: "rgba(255,255,255,0.06)" }
      },
      y: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: { color: "rgba(255,255,255,0.06)" },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Welcome{user?.name ? `, ${user.name}` : ""}<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Your workspace overview: XP, mastery trend, upcoming reviews.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" as="a" href="/study-mode">
            Start study session
          </Button>
          <Button as="a" href="/assessment">
            Take assessment
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)]">
        <div className="space-y-4">
          <XPBar />
          <GlassPanel className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Mastery trend
              </h2>
              <span className="text-xs text-slate-500">
                Clean chart · minimal noise
              </span>
            </div>
            <Line data={chartData} options={chartOptions} height={110} />
          </GlassPanel>
        </div>

        <div className="space-y-4">
          <SurfaceCard className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-100">
                Upcoming reviews
              </h3>
              <span className="text-xs text-slate-500">Spaced repetition</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex justify-between gap-3">
                <span className="truncate">Bias-variance tradeoff</span>
                <span className="text-slate-500">Today</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="truncate">Heap vs priority queue</span>
                <span className="text-slate-500">Tomorrow</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="truncate">Singular value decomposition</span>
                <span className="text-slate-500">3 days</span>
              </li>
            </ul>
            <Button variant="secondary" as="a" href="/study-mode">
              Review now
            </Button>
          </SurfaceCard>

          <SurfaceCard className="p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-100">
              Completed topics
            </h3>
            <p className="text-sm text-slate-500">
              This section will populate automatically from practice history.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}

