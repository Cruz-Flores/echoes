import {
  listCycleSongs,
  listSongsMissingFromCycle,
  missingSongsEmptyMessage,
} from './cycleSongs';

const catalog = [
  { id: 'b', name: 'Bravo', level: 2, version: 'v1' },
  { id: 'a', name: 'Alfa', level: 1, version: 'v2' },
  { id: 'c', name: 'Alfa', level: 3, version: 'v1' },
];

describe('listCycleSongs', () => {
  it('keeps cycle order and uses the catalog label', () => {
    expect(listCycleSongs(catalog, ['b', 'a'])).toEqual([
      { id: 'b', label: 'Bravo · nivel 2 · v1' },
      { id: 'a', label: 'Alfa · nivel 1 · v2' },
    ]);
  });

  it('falls back to the id when the song is not in the catalog', () => {
    expect(listCycleSongs(catalog, ['missing'])).toEqual([
      { id: 'missing', label: 'missing' },
    ]);
  });
});

describe('listSongsMissingFromCycle', () => {
  it('returns catalog songs that are not in the cycle, ordered by name and version', () => {
    expect(listSongsMissingFromCycle(catalog, ['b'])).toEqual([
      { id: 'c', label: 'Alfa · nivel 3 · v1' },
      { id: 'a', label: 'Alfa · nivel 1 · v2' },
    ]);
  });

  it('returns an empty list when every catalog song is already in the cycle', () => {
    expect(listSongsMissingFromCycle(catalog, ['a', 'b', 'c'])).toEqual([]);
  });
});

describe('missingSongsEmptyMessage', () => {
  it('describes loading, error, and a complete cycle', () => {
    expect(missingSongsEmptyMessage('loading')).toBe('Cargando canciones…');
    expect(missingSongsEmptyMessage('error')).toBe(
      'No se pudo cargar el catálogo.',
    );
    expect(missingSongsEmptyMessage('ready')).toBe(
      'No faltan canciones por bailar en este ciclo.',
    );
  });
});
