import { useEffect, useState } from "react";
import BadgeCard from "../components/BadgeCard";
import XPBar from "../components/XPBar";
import { AssessmentAPI } from "../services/api";

export default function Gamification() {
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  useEffect(() => {
    const checkAssessment = async () => {
      try {
        const { data } = await AssessmentAPI.checkStatus();
        setAssessmentCompleted(data.completed);
      } catch (err) {
        console.error("Failed to check assessment status:", err);
      }
    };
    checkAssessment();
  }, []);

  const badges = [
    {
      title: "First assessment completed",
      description: "Completed the initial diagnostic without skipping.",
      earned: assessmentCompleted
    },
    {
      title: "Concept streak",
      description: "Maintained a 7-day active practice streak.",
      earned: false
    },
    {
      title: "Concept master",
      description: "Reached 80%+ mastery on three core concepts.",
      earned: false
    }
  ];

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Gamified progress
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              XP, levels, and badges tuned to keep you accountable without
              distracting from the work.
            </p>
          </div>
        </div>
        <XPBar />
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            Achievements
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b) => (
              <BadgeCard key={b.title} {...b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

