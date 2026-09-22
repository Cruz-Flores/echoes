import { DanceLog, Song, SessionPlaylist } from '../../../shared/types';

/**
 * Calculate which songs were recently danced based on the 90% cycle threshold
 * Per doc.md: A cycle is covered when 90% of distinct songs have been danced
 * Las bailadas recientemente nunca superan el 90% del total de canciones
 */
export function getRecentlyDancedSongIds(
  logs: DanceLog[],
  totalSongs: number,
): Set<string> {
  const threshold = Math.ceil(totalSongs * 0.9);
  const set = new Set<string>();

  for (const log of logs) {
    if (log.wasOmitted) {
      continue;
    }
    if (!log.song) {
      continue;
    }
    set.add(log.song.id);
    if (set.size >= threshold) {
      break;
    }
  }

  return set;
}

/**
 * Count how many times a song was omitted in recent logs
 */
function countRecentOmissions(songId: string, recentLogs: DanceLog[]): number {
  return recentLogs.filter((log) => log.songId === songId && log.wasOmitted)
    .length;
}

/**
 * Check if a song was in the recent cycle
 */
function wasRecentlyDanced(songId: string, recentIds: Set<string>): boolean {
  return recentIds.has(songId);
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate dynamic score for a song based on multiple factors
 * Per doc.md section 6.2:
 * - Uses perceivedLevel as globalFatigue indicator
 * - Uses bodyImpact as kneeSensitivity indicator
 * - Considers recent omissions
 * - Score never prohibits, only orders
 */
export function calculateScore(
  song: Song,
  recentLogs: DanceLog[],
  recentIds: Set<string>,
): number {
  let score = 0;

  // Variety bonus: +2 if not recently danced, -2 if recently danced
  if (!wasRecentlyDanced(song.id, recentIds)) {
    score += 2;
  } else {
    score -= 2;
  }

  // Fatigue penalty: high perceived level (fatigue) songs get penalty
  // Assuming high = level >= 15 (adjust based on your data)
  if (song.perceivedLevel >= 15) {
    score -= 3;
  }

  // Impact penalty: high body impact songs get penalty
  // Assuming high = bodyImpact >= 4 (adjust based on your data)
  if (song.bodyImpact >= 4) {
    score -= 4;
  }

  // Omission penalty: songs that were recently skipped get penalty
  const omissions = countRecentOmissions(song.id, recentLogs);
  score -= omissions;

  return clamp(score, -10, 10);
}

/**
 * Select songs balanced by level distribution
 * Weighted distribution based on available songs per level
 */
function selectBalancedByLevel(
  scoredSongs: Array<{ song: Song; score: number }>,
  targetCount: number,
): Song[] {
  if (scoredSongs.length <= targetCount) {
    return scoredSongs.map((s) => s.song);
  }

  // Count songs per level to determine distribution
  const levelCounts = new Map<number, number>();
  scoredSongs.forEach(({ song }) => {
    levelCounts.set(song.level, (levelCounts.get(song.level) || 0) + 1);
  });

  // Calculate target per level (weighted by availability)
  const totalAvailable = scoredSongs.length;
  const targetPerLevel = new Map<number, number>();

  levelCounts.forEach((count, level) => {
    const proportion = count / totalAvailable;
    targetPerLevel.set(level, Math.ceil(proportion * targetCount));
  });

  // Select songs by level, respecting weights
  const selected: Song[] = [];
  const songsByLevel = new Map<number, Array<{ song: Song; score: number }>>();

  scoredSongs.forEach((scored) => {
    const level = scored.song.level;
    if (!songsByLevel.has(level)) {
      songsByLevel.set(level, []);
    }
    songsByLevel.get(level)!.push(scored);
  });

  // Sort each level by score
  songsByLevel.forEach((songs) => {
    songs.sort((a, b) => b.score - a.score);
  });

  // Fill from each level according to target
  let remaining = targetCount;
  const levels = Array.from(targetPerLevel.keys());

  while (remaining > 0 && levels.length > 0) {
    for (const level of levels) {
      const levelSongs = songsByLevel.get(level) || [];
      const target = targetPerLevel.get(level) || 0;

      if (levelSongs.length > 0 && target > 0) {
        const song = levelSongs.shift()!;
        selected.push(song.song);
        targetPerLevel.set(level, target - 1);
        remaining--;

        if (remaining === 0) break;
      }
    }
  }

  return selected;
}

/**
 * Build a frozen session playlist based on current state
 * Per doc.md section 6.3
 */
export function buildSessionPlaylist(
  sessionId: string,
  songs: Song[],
  logs: DanceLog[],
  targetCount: number,
): SessionPlaylist {
  const recentIds = getRecentlyDancedSongIds(logs, songs.length);

  // Filter out recently danced songs
  let available = songs.filter((s) => !recentIds.has(s.id));

  // If not enough songs available (cycle completed), use all songs
  if (available.length < targetCount) {
    available = songs;
  }

  // Score all available songs
  const scored = available.map((song) => ({
    song,
    score: calculateScore(song, logs, recentIds),
  }));

  // Sort by score descending
  const ordered = scored.sort((a, b) => b.score - a.score);

  // Select balanced by level
  const selected = selectBalancedByLevel(ordered, targetCount);

  return {
    sessionId,
    songIds: selected.map((s) => s.id),
    createdAt: new Date().toISOString(),
  };
}
