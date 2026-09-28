import { useEffect, useState, useContext } from 'react';
import { SongList } from '../../features/songs/ui/SongList';
import { SessionStats } from '../../features/sessions/ui/SessionStats';
import { LogOtherSong } from '../../features/sessions/ui/LogOtherSong';
import { CycleDancedSongs } from '../../features/sessions/ui/CycleDancedSongs';
import { useField } from '../../shared/hooks/useField';
import { useSongs } from '../../features/songs/hooks/useSong';
import { sessionStorage } from '../../features/sessions/storage/sessionStorage';
import { useDanceSession } from '../../features/sessions/hooks/useDanceSession';
// Session-based playlist stays in useSessionPlaylist.ts so it can be recovered.
// import { buildSessionPlaylist } from '../../features/sessions/hooks/useSessionPlaylist';
import {
  buildCyclePlaylist,
  addSongToCycle,
} from '../../features/sessions/hooks/useCyclePlaylist';
// import { useDanceLog } from '../../features/sessions/hooks/useDanceLog';
import { StatsSessionContext } from '../../StatsSessionProvider';
import type { Song } from '../../shared/types';
// import type { Song, PlaylistAlgorithm } from '../../shared/types';

function readCycleSongIds(): string[] {
  const cycle = sessionStorage.getCurrentCycle();
  if (!cycle || !Array.isArray(cycle.songIds)) {
    return [];
  }
  return [...cycle.songIds];
}

export const SessionPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [dancedSongsIds, setDancedSongsIds] = useState<string[]>(() =>
    sessionStorage.getDancedSongsIds(),
  );
  const [activeSessionId, setActiveSessionId] = useState<string | null>(() =>
    sessionStorage.getActiveSessionId(),
  );
  // const [selectedAlgorithm, setSelectedAlgorithm] = useState<PlaylistAlgorithm>(
  //   () => sessionStorage.getPlaylistAlgorithm(),
  // );
  const [cycleSongIds, setCycleSongIds] = useState<string[]>(readCycleSongIds);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const { input: targetSongsInput, reset: resetTargetSongsInput } =
    useField('number');

  const { useGetAll: getAllSongs } = useSongs();
  const { createSession, closeSession } = useDanceSession();
  // const { getRecentLogs } = useDanceLog();

  const context = useContext(StatsSessionContext);
  const clearStats = context?.clearStats;

  const handleSessionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsCreatingSession(true);
    try {
      const targetSongsCount = +targetSongsInput.value;
      const newSession = await createSession(targetSongsCount);
      const fetchedSongs = await getAllSongs({});

      // Session-based listing is commented in the front. The algorithm remains
      // in useSessionPlaylist.ts.
      // if (selectedAlgorithm === 'cycle-based') {
      const playlistData = buildCyclePlaylist(
        newSession.id,
        fetchedSongs,
        targetSongsCount,
      );
      // } else {
      //   const recentLogs = await getRecentLogs('dancedAt', 'DESC', 200);
      //   playlistData = buildSessionPlaylist(
      //     newSession.id,
      //     fetchedSongs,
      //     recentLogs,
      //     targetSongsCount,
      //   );
      // }

      sessionStorage.setSessionPlaylist(playlistData);
      sessionStorage.setActiveSessionId(newSession.id);
      // sessionStorage.setPlaylistAlgorithm(selectedAlgorithm);
      setCycleSongIds(readCycleSongIds());

      const playlistSongs = playlistData.songIds
        .map((id: string) => fetchedSongs.find((song: Song) => song.id === id))
        .filter((song): song is Song => song !== undefined);
      setActiveSessionId(newSession.id);
      setSongs(playlistSongs);
      sessionStorage.clearSessionStats();
      resetTargetSongsInput();
    } catch (error) {
      console.error('Failed to create session:', error);
      alert('Failed to create session. Please try again.');
    } finally {
      setIsCreatingSession(false);
    }
  };

  const handleEndSession = async () => {
    if (!activeSessionId) {
      return void 0;
    }
    try {
      await closeSession(activeSessionId);
      setActiveSessionId(null);
      setSongs([]);
      setDancedSongsIds([]);
      sessionStorage.clearAll();
      clearStats?.();
    } catch (error) {
      console.error('Failed to close session:', error);
      alert('Failed to close session. Please try again.');
    }
  };

  const handleSongDanced = (songId: string) => {
    sessionStorage.addDancedSongId(songId);
    setDancedSongsIds((prev) => [...prev, songId]);

    // Session-based mode used to skip this. The front now always tracks the cycle.
    // if (selectedAlgorithm === 'cycle-based') {
    addSongToCycle(songId);
    setCycleSongIds(readCycleSongIds());
    // }
  };

  const handleResetCycle = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the cycle? All songs in the current cycle will be removed and a new cycle will start.',
    );
    if (confirmed) {
      sessionStorage.clearCurrentCycle();
      setCycleSongIds([]);
    }
  };

  const refreshUpdatedSong = (updatedSong: Song) => {
    const newSongs = songs.map((song) =>
      song.id === updatedSong.id ? updatedSong : song,
    );
    setSongs(newSongs);
  };

  useEffect(() => {
    if (!activeSessionId) {
      return void 0;
    }
    const playlist = sessionStorage.getSessionPlaylist();
    if (!playlist || playlist.sessionId !== activeSessionId) {
      return void 0;
    }
    getAllSongs({}).then((fetchedSongs) => {
      const playlistSongs = playlist.songIds
        .map((id: string) => fetchedSongs.find((song: Song) => song.id === id))
        .filter((song): song is Song => song !== undefined);
      setSongs(playlistSongs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSessionId]);

  const visibleSongs = songs.filter(
    (song) => !dancedSongsIds.includes(song.id),
  );

  return (
    <>
      {!activeSessionId ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Start Session
            </h2>
            <p className="text-gray-600 mb-6">
              No active session. Enter target number of songs.
            </p>

            {/* Cycle Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Current Cycle
                  </p>
                  <p className="text-lg font-bold text-blue-700">
                    {cycleSongIds.length} songs
                  </p>
                </div>
                {cycleSongIds.length > 0 && (
                  <button
                    onClick={handleResetCycle}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Reset Cycle
                  </button>
                )}
              </div>
              <CycleDancedSongs songIds={cycleSongIds} />
            </div>

            <form onSubmit={handleSessionSubmit} className="space-y-4">
              {/* Session-based playlist selector. Recover from here; logic is in useSessionPlaylist.ts.
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Playlist Algorithm
                </label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) =>
                    setSelectedAlgorithm(e.target.value as PlaylistAlgorithm)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isCreatingSession}
                >
                  <option value="session-based">
                    Session Based (Original)
                  </option>
                  <option value="cycle-based">
                    Cycle Based (90% threshold)
                  </option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedAlgorithm === 'session-based'
                    ? 'Uses recent logs and scoring algorithm'
                    : 'Tracks cycle and resets at 90% of total songs'}
                </p>
              </div>
              */}
              <input
                {...targetSongsInput}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Target songs count (e.g., 20)"
                disabled={isCreatingSession}
              />
              <button
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400"
                disabled={isCreatingSession}
              >
                {isCreatingSession ? 'Creating session...' : 'Start Session'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Fixed Header Section */}
          <div className="flex-none bg-white border-b border-gray-200 shadow-md">
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {/* Components */}
              {/* Log Other Song */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <LogOtherSong
                  sessionId={activeSessionId!}
                  onSongLogged={handleSongDanced}
                />
              </div>

              {/* Session Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Active Session
                    </h2>
                    <p className="text-sm text-gray-500">
                      {visibleSongs.length} songs remaining (
                      {dancedSongsIds.length} danced)
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <SessionStats />
                    <button
                      onClick={handleEndSession}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      End Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Cycle Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Current Cycle
                    </p>
                    <p className="text-lg font-bold text-blue-700">
                      {cycleSongIds.length} songs
                    </p>
                  </div>
                  {cycleSongIds.length > 0 && (
                    <button
                      onClick={handleResetCycle}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Reset Cycle
                    </button>
                  )}
                </div>
                <CycleDancedSongs songIds={cycleSongIds} />
              </div>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto bg-gray-100">
            <div className="max-w-7xl mx-auto p-4">
              <SongList
                sessionId={activeSessionId!}
                songs={visibleSongs}
                refreshUpdatedSong={refreshUpdatedSong}
                onSongDanced={handleSongDanced}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
