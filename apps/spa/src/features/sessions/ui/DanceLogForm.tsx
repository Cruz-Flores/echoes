import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { StatsSessionContext } from '../../../StatsSessionProvider';
import { useDanceLog } from '../hooks/useDanceLog';
import { useField } from '../../../shared/hooks/useField';

export function DanceLogForm({
  songId,
  sessionId,
  setView,
}: DanceLogProps & {
  setView: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    input: { value: kcalInput, ...kcalInputProps },
    reset: resetDanceLog,
  } = useField('number');
  const { createDanceLog } = useDanceLog();
  const context = useContext(StatsSessionContext);
  const refreshStats = context?.refreshStats;
  const addDanceLog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createDanceLog({
      id: uuidv4(),
      kcal: +kcalInput,
      sessionId,
      songId,
      wasOmitted: false,
      dancedAt: new Date().toISOString(),
    });

    // Call setView - handles both boolean setter and callback function
    if (typeof setView === 'function' && setView.length === 0) {
      // It's a callback with no args
      (setView as () => void)();
    } else if (typeof setView === 'function') {
      // It's a React setState function
      (setView as React.Dispatch<React.SetStateAction<boolean>>)(false);
    }

    resetDanceLog();
    refreshStats?.({
      totalKcal: +kcalInput,
      totalSongs: 1,
    });
  };

  return (
    <form onSubmit={addDanceLog} className="flex items-center gap-2">
      <input
        {...kcalInputProps}
        value={kcalInput}
        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Kcal"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
      >
        log
      </button>
    </form>
  );
}

export interface DanceLogProps {
  sessionId: string;
  songId: string;
}
