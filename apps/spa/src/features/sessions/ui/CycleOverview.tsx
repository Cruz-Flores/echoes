import { useMemo } from 'react';
import { useToggle } from '../../../shared/hooks/useToggle';
import { useSongCatalog } from '../hooks/useSongCatalog';
import {
  listCycleSongs,
  listSongsMissingFromCycle,
  missingSongsEmptyMessage,
} from '../model/cycleSongs';
import { CycleOverviewView } from './CycleOverviewView';

type CycleOverviewProps = {
  songIds: string[];
  onReset: () => void;
  className?: string;
  direction?: 'row' | 'column';
  defaultExpanded?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
};

export const CycleOverview = ({
  songIds,
  onReset,
  className,
  direction = 'row',
  defaultExpanded = false,
  isExpanded: isExpandedProp,
  onToggle: onToggleProp,
}: CycleOverviewProps) => {
  const { catalog, status } = useSongCatalog();
  const { isOn, toggle } = useToggle(defaultExpanded);
  const isControlled = onToggleProp !== undefined;
  const isExpanded = isControlled ? Boolean(isExpandedProp) : isOn;
  const onToggle = isControlled ? onToggleProp : toggle;
  const dancedSongs = useMemo(
    () => listCycleSongs(catalog, songIds),
    [catalog, songIds],
  );
  const missingSongs = useMemo(
    () => listSongsMissingFromCycle(catalog, songIds),
    [catalog, songIds],
  );
  const missingTitle =
    status === 'ready'
      ? `Faltan por bailar (${missingSongs.length})`
      : 'Faltan por bailar';

  return (
    <CycleOverviewView
      className={className}
      dancedCount={songIds.length}
      dancedSongs={dancedSongs}
      missingSongs={missingSongs}
      missingTitle={missingTitle}
      missingEmptyMessage={missingSongsEmptyMessage(status)}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onReset={onReset}
      direction={direction}
    />
  );
};
