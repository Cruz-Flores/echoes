import { useEffect, useState } from 'react';
import { useSongs } from '../../songs/hooks/useSong';
import type { Song } from '../../../shared/types';

type CycleDancedSongsProps = {
  songIds: string[];
};

export const CycleDancedSongs = ({ songIds }: CycleDancedSongsProps) => {
  const [catalog, setCatalog] = useState<Song[]>([]);
  const { useGetAll: getAllSongs } = useSongs();

  useEffect(() => {
    let cancelled = false;
    getAllSongs({})
      .then((songs: Song[]) => {
        if (!cancelled && Array.isArray(songs)) {
          setCatalog(songs);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (songIds.length === 0) {
    return (
      <p className="mt-3 text-sm text-blue-800">
        Ninguna canción bailada en este ciclo.
      </p>
    );
  }

  const songsById = new Map(catalog.map((song) => [song.id, song]));

  return (
    <div className="mt-3">
      <p className="mb-2 text-sm font-medium text-blue-900">
        Canciones bailadas en este ciclo
      </p>
      <ul className="max-h-48 space-y-1 overflow-y-auto">
        {songIds.map((songId, index) => {
          const song = songsById.get(songId);
          const label = song
            ? `${song.name} · nivel ${song.level} · ${song.version}`
            : songId;
          return (
            <li key={songId} className="text-sm text-blue-950">
              {index + 1}. {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
