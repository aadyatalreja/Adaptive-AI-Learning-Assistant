import { useEffect, useState } from "react";
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
import { CourseAPI } from "../services/api";

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
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    setCompletedTopics([
      "Supervised vs unsupervised learning",
      "Asymptotic complexity basics",
      "Matrix multiplication and norms"
    ]);

    const fetchCourseData = async () => {
      try {
        setLoadingReviews(true);
        const { data } = await CourseAPI.myCourse();
        if (data && Array.isArray(data.modules)) {
          const mappedReviews = data.modules.slice(0, 5).map(module => {
            let status = "Scheduled";
            const level = (module.level || "").toLowerCase();
            
            if (level.includes("beginner")) {
              status = "Today · High priority";
            } else if (level.includes("intermediate")) {
              status = "Tomorrow";
            } else if (level.includes("advanced")) {
              status = "In 3 days";
            }

            return {
              topic: module.title,
              status: status
            };
          });
          setReviews(mappedReviews);
        }
      } catch (err) {
        console.error("Failed to fetch course for reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchCourseData();
  }, [setCompletedTopics]);

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Concept mastery",
        data: [40, 52, 63, 72],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
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
          color: "#cbd5f5",
          font: { size: 10 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: { color: "rgba(30,64,175,0.25)" }
      },
      y: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: { color: "rgba(30,64,175,0.25)" },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="page-shell">
      <div className="max-w-6xl mx-auto px-4 py-6 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Learning dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Overview of your current level, XP, and upcoming reviews.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] mb-5">
          <div className="space-y-4">
            <XPBar />
            <div className="glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-100">
                  Progress overview
                </h2>
                <span className="text-[11px] text-slate-500">
                  Machine Learning · Data Structures
                </span>
              </div>
              <Line data={chartData} options={chartOptions} height={110} />
            </div>
          </div>
          <div className="card-muted p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-100">
              Upcoming reviews
            </h3>
            <p className="text-xs text-slate-400">
              Spaced repetition sessions prioritized by forgetting curves.
            </p>
            <ul className="mt-2 space-y-2 text-xs text-slate-300">
              {loadingReviews ? (
                <div className="space-y-2 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between">
                      <div className="h-3 w-2/3 bg-slate-800 rounded" />
                      <div className="h-3 w-1/4 bg-slate-800 rounded" />
                    </div>
                  ))}
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <li key={idx} className="flex justify-between gap-3">
                    <span className="truncate">{review.topic}</span>
                    <span className="text-slate-500 flex-shrink-0">{review.status}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 italic">
                  No upcoming reviews. Generate a course to get started.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

