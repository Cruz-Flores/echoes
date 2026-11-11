import type { SongLabel } from '../model/cycleSongs';
import { SongLabelList } from './SongLabelList';

type CycleSongColumnsProps = {
  dancedSongs: SongLabel[];
  missingSongs: SongLabel[];
  missingTitle: string;
  missingEmptyMessage: string;
  direction?: 'row' | 'column';
};

export const CycleSongColumns = ({
  dancedSongs,
  missingSongs,
  missingTitle,
  missingEmptyMessage,
  direction = 'row',
}: CycleSongColumnsProps) => {
  const layoutClass =
    direction === 'row'
      ? 'mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'
      : 'mt-3 flex flex-col gap-4';

  return (
    <div className={layoutClass}>
      <SongLabelList
        title="Canciones bailadas en este ciclo"
        songs={dancedSongs}
        emptyMessage="Ninguna canción bailada en este ciclo."
      />
      <SongLabelList
        title={missingTitle}
        songs={missingSongs}
        emptyMessage={missingEmptyMessage}
      />
    </div>
  );
};
