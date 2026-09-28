import { v4 as uuidv4 } from 'uuid';
import type { Song, SessionPlaylist } from '../../../shared/types';
import { sessionStorage } from '../storage/sessionStorage';

/**
 * Calculate if cycle should reset based on 90% threshold
 */
function shouldResetCycle(cycleSize: number, totalSongs: number): boolean {
  const threshold = Math.ceil(totalSongs * 0.9);
  return cycleSize >= threshold;
}

/**
 * Calculate global level: (perceivedLevel + bodyImpact) / 2
 */
type SongWithLevel = Song & { nivelGlobal: number };

function withNivelGlobal(songs: Song[]): SongWithLevel[] {
  return songs.map((song) => ({
    ...song,
    nivelGlobal: (song.perceivedLevel + song.bodyImpact) / 2,
  }));
}

/**
 * Stratify songs into N strata (NTILE)
 */
type SongWithStratum = SongWithLevel & { estrato: number };

function stratify(songs: SongWithLevel[], numEstratos = 5): SongWithStratum[] {
  const sorted = [...songs].sort((a, b) => a.nivelGlobal - b.nivelGlobal);

  return sorted.map((song, index) => ({
    ...song,
    estrato: Math.floor((index * numEstratos) / sorted.length) + 1,
  }));
}

/**
 * Shuffle songs within each stratum
 */
function shuffleByStratum(
  songs: SongWithStratum[],
): Map<number, SongWithStratum[]> {
  const byStratum = new Map<number, SongWithStratum[]>();

  for (const song of songs) {
    if (!byStratum.has(song.estrato)) {
      byStratum.set(song.estrato, []);
    }
    byStratum.get(song.estrato)!.push(song);
  }

  for (const list of byStratum.values()) {
    list.sort(() => Math.random() - 0.5);
  }

  return byStratum;
}

/**
 * Build balanced set using round-robin selection from strata
 */
function selectSongsFromAvailable(
  availableSongs: Song[],
  targetCount: number,
): Song[] {
  const numEstratos = 5;

  const base = withNivelGlobal(availableSongs);
  const stratified = stratify(base, numEstratos);
  const byStratum = shuffleByStratum(stratified);

  const result: Song[] = [];
  let added = true;

  while (result.length < targetCount && added) {
    added = false;

    for (let e = 1; e <= numEstratos; e++) {
      const list = byStratum.get(e);
      if (list && list.length > 0 && result.length < targetCount) {
        result.push(list.shift()!);
        added = true;
      }
    }
  }

  return result;
}

/**
 * Build playlist using cycle-based algorithm
 */
export function buildCyclePlaylist(
  sessionId: string,
  allSongs: Song[],
  targetCount: number,
): SessionPlaylist {
  let cycle = sessionStorage.getCurrentCycle();
  console.log('Existing cycle:', cycle);

  // Check if cycle should reset
  if (cycle && shouldResetCycle(cycle.songIds.length, allSongs.length)) {
    sessionStorage.clearCurrentCycle();
    console.log('Cycle reset due to threshold');
    cycle = null;
  }

  // Create new cycle if doesn't exist
  if (!cycle) {
    cycle = {
      id: uuidv4(),
      songIds: [],
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setCurrentCycle(cycle);
    console.log('New cycle created:', cycle);
  }

  console.log('Current cycle:', cycle);
  // Filter out songs already in cycle
  const availableSongs = allSongs.filter(
    (song) => !cycle!.songIds.includes(song.id),
  );

  // Select songs using mock algorithm
  const selectedSongs = selectSongsFromAvailable(availableSongs, targetCount);

  return {
    sessionId,
    songIds: selectedSongs.map((s) => s.id),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Add danced song to current cycle
 */
export function addSongToCycle(songId: string): void {
  let cycle = sessionStorage.getCurrentCycle();

  if (!cycle) {
    cycle = {
      id: uuidv4(),
      songIds: [],
      createdAt: new Date().toISOString(),
    };
  }

  // Add song to cycle if not already there
  if (!cycle.songIds.includes(songId)) {
    cycle.songIds.push(songId);
  }

  sessionStorage.setCurrentCycle(cycle);
}
