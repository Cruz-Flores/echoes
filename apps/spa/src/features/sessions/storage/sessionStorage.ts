import type {
  SessionPlaylist,
  SessionStats,
  Cycle,
  PlaylistAlgorithm,
} from '../../../shared/types';

const ACTIVE_SESSION_ID_KEY = 'activeSessionId';
const SESSION_PLAYLIST_KEY = 'sessionPlaylist';
const SESSION_STATS_KEY = 'sessionStats';
const CURRENT_SONG_INDEX_KEY = 'currentSongIndex';
const DANCED_SONGS_KEY = 'dancedSongsIds';
const CURRENT_CYCLE_KEY = 'currentCycle';
const PLAYLIST_ALGORITHM_KEY = 'playlistAlgorithm';

export const sessionStorage = {
  getActiveSessionId: (): string | null => {
    return localStorage.getItem(ACTIVE_SESSION_ID_KEY);
  },

  setActiveSessionId: (sessionId: string): void => {
    localStorage.setItem(ACTIVE_SESSION_ID_KEY, sessionId);
  },

  clearActiveSessionId: (): void => {
    localStorage.removeItem(ACTIVE_SESSION_ID_KEY);
  },

  getSessionPlaylist: (): SessionPlaylist | null => {
    const saved = localStorage.getItem(SESSION_PLAYLIST_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  setSessionPlaylist: (playlist: SessionPlaylist): void => {
    localStorage.setItem(SESSION_PLAYLIST_KEY, JSON.stringify(playlist));
  },

  clearSessionPlaylist: (): void => {
    localStorage.removeItem(SESSION_PLAYLIST_KEY);
  },

  getCurrentSongIndex: (): number => {
    const saved = localStorage.getItem(CURRENT_SONG_INDEX_KEY);
    return saved ? Number(saved) : 0;
  },

  setCurrentSongIndex: (index: number): void => {
    localStorage.setItem(CURRENT_SONG_INDEX_KEY, String(index));
  },

  clearCurrentSongIndex: (): void => {
    localStorage.removeItem(CURRENT_SONG_INDEX_KEY);
  },

  getSessionStats: (): SessionStats => {
    const saved = localStorage.getItem(SESSION_STATS_KEY);
    return saved ? JSON.parse(saved) : { totalKcal: 0, totalSongs: 0 };
  },

  setSessionStats: (stats: SessionStats): void => {
    localStorage.setItem(SESSION_STATS_KEY, JSON.stringify(stats));
  },

  clearSessionStats: (): void => {
    localStorage.removeItem(SESSION_STATS_KEY);
  },

  getDancedSongsIds: (): string[] => {
    const saved = localStorage.getItem(DANCED_SONGS_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  addDancedSongId: (songId: string): void => {
    const current = sessionStorage.getDancedSongsIds();
    if (!current.includes(songId)) {
      current.push(songId);
      localStorage.setItem(DANCED_SONGS_KEY, JSON.stringify(current));
    }
  },

  clearDancedSongsIds: (): void => {
    localStorage.removeItem(DANCED_SONGS_KEY);
  },

  getCurrentCycle: (): Cycle | null => {
    console.log('Retrieving current cycle from storage');
    const saved = localStorage.getItem(CURRENT_CYCLE_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  setCurrentCycle: (cycle: Cycle): void => {
    console.log('Setting current cycle:', cycle);
    localStorage.setItem(CURRENT_CYCLE_KEY, JSON.stringify(cycle));
  },

  addSongToCycle: (songId: string): void => {
    const cycle = sessionStorage.getCurrentCycle();
    if (cycle && !cycle.songIds.includes(songId)) {
      console.log('Adding song to cycle:', songId);
      cycle.songIds.push(songId);
      sessionStorage.setCurrentCycle(cycle);
    }
  },

  clearCurrentCycle: (): void => {
    console.log('Clearing current cycle');
    localStorage.removeItem(CURRENT_CYCLE_KEY);
  },

  getPlaylistAlgorithm: (): PlaylistAlgorithm => {
    const saved = localStorage.getItem(PLAYLIST_ALGORITHM_KEY);
    return (saved as PlaylistAlgorithm) || 'session-based';
  },

  setPlaylistAlgorithm: (algorithm: PlaylistAlgorithm): void => {
    localStorage.setItem(PLAYLIST_ALGORITHM_KEY, algorithm);
  },

  clearAll: (): void => {
    localStorage.removeItem(ACTIVE_SESSION_ID_KEY);
    localStorage.removeItem(SESSION_PLAYLIST_KEY);
    localStorage.removeItem(SESSION_STATS_KEY);
    localStorage.removeItem(CURRENT_SONG_INDEX_KEY);
    localStorage.removeItem(DANCED_SONGS_KEY);
    // localStorage.removeItem(CURRENT_CYCLE_KEY);
    localStorage.removeItem(PLAYLIST_ALGORITHM_KEY);
  },
};
