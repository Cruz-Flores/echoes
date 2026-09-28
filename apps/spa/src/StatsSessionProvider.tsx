import { createContext, useState } from 'react';

type RefreshStatsParams = {
  totalKcal: number;
  totalSongs: number;
};
type StatsSessionContextType = {
  sessionStats: {
    totalKcal: number;
    totalSongs: number;
  };
  refreshStats: ({ totalKcal, totalSongs }: RefreshStatsParams) => void;
  clearStats: () => void;
};

const StatsSessionContext = createContext<StatsSessionContextType | null>(null);

const StatsSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionStats, setSessionStats] = useState(() => {
    const saved = localStorage.getItem('sessionStats');
    return saved ? JSON.parse(saved) : { totalKcal: 0, totalSongs: 0 };
  });
  const refreshStats = ({ totalKcal, totalSongs }: RefreshStatsParams) => {
    const newStats = {
      totalKcal: sessionStats.totalKcal + totalKcal,
      totalSongs: sessionStats.totalSongs + totalSongs,
    };
    setSessionStats(newStats);
    localStorage.setItem('sessionStats', JSON.stringify(newStats));
  };
  const clearStats = () => {
    const initialStats = { totalKcal: 0, totalSongs: 0 };
    setSessionStats(initialStats);
    localStorage.removeItem('sessionStats');
  };

  return (
    <StatsSessionContext.Provider
      value={{ sessionStats, refreshStats, clearStats }}
    >
      {children}
    </StatsSessionContext.Provider>
  );
};

export { StatsSessionContext, StatsSessionProvider };
