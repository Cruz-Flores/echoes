import { useEffect, useState } from 'react';
import { useSongs } from '../../songs/hooks/useSong';
import type { Song } from '../../../shared/types';
import type { SongCatalogStatus } from '../model/cycleSongs';

export const useSongCatalog = () => {
  const [catalog, setCatalog] = useState<Song[]>([]);
  const [status, setStatus] = useState<SongCatalogStatus>('loading');
  const { useGetAll: getAllSongs } = useSongs();

  useEffect(() => {
    let cancelled = false;

    getAllSongs({})
      .then((songs: Song[]) => {
        if (cancelled) {
          return;
        }
        if (!Array.isArray(songs)) {
          setStatus('error');
          return;
        }
        setCatalog(songs);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
    // getAllSongs is recreated on each render by useSongs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { catalog, status };
};
