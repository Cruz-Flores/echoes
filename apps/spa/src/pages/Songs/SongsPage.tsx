import { useState, useEffect } from 'react';
import { SongForm } from '../../features/songs/ui/SongForm';
import { AllSongsList } from '../../features/songs/ui/AllSongsList';
import { useSongs } from '../../features/songs/hooks/useSong';
import type { Song } from '../../shared/types';

export const SongsPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const { useGetAllUnfiltered: getAllUnfilteredSongs } = useSongs();
  const refreshSongs = (newSong: Song) => {
    setSongs([...songs, newSong]);
  };
  const refreshUpdatedSong = (updatedSong: Song) => {
    setSongs(
      songs.map((song) => (song.id === updatedSong.id ? updatedSong : song)),
    );
  };
  const loadAllSongs = async () => {
    const allSongs = await getAllUnfilteredSongs();
    setSongs(allSongs);
  };
  // Load songs on mount
  useEffect(() => {
    loadAllSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Song Management
        </h1>

        {/* Create Song Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create New Song
          </h2>
          <SongForm refreshSongs={refreshSongs} />
        </div>

        {/* All Songs List Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              All Songs ({songs.length})
            </h2>
            <button
              onClick={loadAllSongs}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
          <AllSongsList
            songs={songs}
            onDanceLogCreated={() => {}}
            refreshUpdatedSong={refreshUpdatedSong}
            showEditMode={true}
          />
        </div>
      </div>
    </div>
  );
};
