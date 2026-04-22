import { createContext, useContext, useState } from "react";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedTopics, setCompletedTopics] = useState([]);

  const addXp = (amount) => {
    setXp((prev) => prev + amount);
    // Simple level calculation for now
    setLevel((prev) => prev + Math.floor((xp + amount) / 500));
  };

  const value = {
    xp,
    level,
    completedTopics,
    setCompletedTopics,
    addXp
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

