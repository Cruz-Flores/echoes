import type { Song } from '../../../shared/types';

export type SongLabel = {
  id: string;
  label: string;
};

export type SongCatalogStatus = 'loading' | 'ready' | 'error';

type SongIdentity = Pick<Song, 'id' | 'name' | 'level' | 'version'>;

export function formatSongLabel(
  song: Pick<Song, 'name' | 'level' | 'version'>,
): string {
  return `${song.name} · nivel ${song.level} · ${song.version}`;
}

export function listCycleSongs(
  catalog: readonly SongIdentity[],
  cycleSongIds: readonly string[],
): SongLabel[] {
  const songsById = new Map(catalog.map((song) => [song.id, song]));

  return cycleSongIds.map((songId) => {
    const song = songsById.get(songId);
    return {
      id: songId,
      label: song ? formatSongLabel(song) : songId,
    };
  });
}

export function listSongsMissingFromCycle(
  catalog: readonly SongIdentity[],
  cycleSongIds: readonly string[],
): SongLabel[] {
  const dancedIds = new Set(cycleSongIds);

  return catalog
    .filter((song) => !dancedIds.has(song.id))
    .sort(
      (a, b) =>
        a.name.localeCompare(b.name, 'es') ||
        a.version.localeCompare(b.version, 'es'),
    )
    .map((song) => ({
      id: song.id,
      label: formatSongLabel(song),
    }));
}

export function missingSongsEmptyMessage(status: SongCatalogStatus): string {
  if (status === 'loading') {
    return 'Cargando canciones…';
  }
  if (status === 'error') {
    return 'No se pudo cargar el catálogo.';
  }
  return 'No faltan canciones por bailar en este ciclo.';
}
