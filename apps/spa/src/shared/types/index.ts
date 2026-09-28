export type Song = {
  id: string;
  name: string;
  level: number;
  perceivedLevel: number;
  bodyImpact: number;
  version: string;
  kcalsAverage: number;
};

export type DanceLog = {
  id: string;
  kcal: number;
  sessionId: string;
  songId: string;
  wasOmitted: boolean;
  dancedAt: string;
  song?: Song;
};

export type DanceSession = {
  id: string;
  startedAt: string;
  endedAt: string | null;
  targetSongsCount: number;
};

export type SessionPlaylist = {
  sessionId: string;
  songIds: string[];
  createdAt: string;
};

export type SessionStats = {
  totalKcal: number;
  totalSongs: number;
};

export type Cycle = {
  id: string;
  songIds: string[];
  createdAt: string;
};

export type PlaylistAlgorithm = 'session-based' | 'cycle-based';
