import { StatsSessionContext } from '../StatsSessionProvider';
import { useContext } from 'react';

export const SessionStats = () => {
  const sessionStats = useContext(StatsSessionContext);
  const totalKcal = sessionStats?.sessionStats.totalKcal;
  const totalSongs = sessionStats?.sessionStats.totalSongs;

  return (
    <div className="flex gap-6 items-center">
      <div className="text-right">
        <p className="text-sm text-gray-600">canciones bailadas</p>
        <p className="text-2xl font-bold text-blue-600">{totalSongs}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">kcal totales</p>
        <p className="text-2xl font-bold text-green-600">{totalKcal}</p>
      </div>
    </div>
  );
};
