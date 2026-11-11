import type { SongLabel } from '../model/cycleSongs';

type SongLabelListProps = {
  title: string;
  songs: SongLabel[];
  emptyMessage: string;
};

export const SongLabelList = ({
  title,
  songs,
  emptyMessage,
}: SongLabelListProps) => {
  return (
    <section className="min-w-0">
      <h3 className="mb-2 text-sm font-medium text-blue-900">{title}</h3>
      {songs.length === 0 ? (
        <p className="text-sm text-blue-800">{emptyMessage}</p>
      ) : (
        <ul className="max-h-48 space-y-1 overflow-y-auto">
          {songs.map((song, index) => (
            <li key={song.id} className="break-words text-sm text-blue-950">
              {index + 1}. {song.label}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
