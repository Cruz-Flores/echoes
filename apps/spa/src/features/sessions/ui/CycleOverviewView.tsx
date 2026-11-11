import { useId } from 'react';
import type { SongLabel } from '../model/cycleSongs';
import { CycleSongColumns } from './CycleSongColumns';

export type CycleOverviewViewProps = {
  dancedCount: number;
  dancedSongs: SongLabel[];
  missingSongs: SongLabel[];
  missingTitle: string;
  missingEmptyMessage: string;
  isExpanded: boolean;
  onToggle: () => void;
  onReset?: () => void;
  direction?: 'row' | 'column';
  className?: string;
};

export const CycleOverviewView = ({
  dancedCount,
  dancedSongs,
  missingSongs,
  missingTitle,
  missingEmptyMessage,
  isExpanded,
  onToggle,
  onReset,
  direction = 'row',
  className,
}: CycleOverviewViewProps) => {
  const columnsId = useId();

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-blue-900">Current Cycle</p>
          <p className="text-lg font-bold text-blue-700">{dancedCount} songs</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={columnsId}
            onClick={onToggle}
            className="rounded border border-blue-300 bg-white px-3 py-1 text-sm text-blue-800 transition-colors hover:bg-blue-100"
          >
            {isExpanded ? 'Ocultar' : 'Mostrar'}
          </button>
          {dancedCount > 0 && onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
            >
              Reset Cycle
            </button>
          ) : null}
        </div>
      </div>
      {isExpanded ? (
        <div id={columnsId}>
          <CycleSongColumns
            dancedSongs={dancedSongs}
            missingSongs={missingSongs}
            missingTitle={missingTitle}
            missingEmptyMessage={missingEmptyMessage}
            direction={direction}
          />
        </div>
      ) : null}
    </div>
  );
};
