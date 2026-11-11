import { useState } from 'react';
import { DanceLogForm } from '../../../features/sessions/ui/DanceLogForm';
import { EditSongForm } from './EditSongForm';
import type { Song } from '../../../shared/types';

const colors = [
  'e2efda',
  'c6e0b4',
  'fff2cc',
  'ffd966',
  'fce4d6',
  'f8cbad',
  'f4b084',
];

export const AllSongsList = ({
  songs,
  sessionId,
  onDanceLogCreated,
  refreshUpdatedSong,
  showEditMode = false,
}: AllSongsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const songsByPerceivedLevel = filteredSongs.reduce(
    (acc, song) => {
      const level = song.perceivedLevel;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(song);
      return acc;
    },
    {} as Record<number, Song[]>,
  );

  for (const level in songsByPerceivedLevel) {
    songsByPerceivedLevel[level].sort((a, b) => {
      if (a.bodyImpact === b.bodyImpact) {
        return b.kcalsAverage - a.kcalsAverage;
      }
      return a.bodyImpact - b.bodyImpact;
    });
  }

  const perceivedLevels = Object.keys(songsByPerceivedLevel)
    .map((level) => Number(level))
    .sort((a, b) => a - b);

  const handleDanceLogComplete = (songId: string) => {
    setSelectedSongId(null);
    onDanceLogCreated?.(songId);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="max-h-[400px] overflow-y-auto">
        <p className="mb-2 text-sm text-gray-600">
          {filteredSongs.length} songs
        </p>
        {perceivedLevels.map((level) => (
          <div key={level} className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Perceived Level {level}
            </h3>
            <ul className="list-none p-0 space-y-1">
              {songsByPerceivedLevel[level].map((song) => (
                <li
                  key={song.id}
                  className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: `#${colors[song.bodyImpact]}` }}
                >
                  {editingSongId === song.id && showEditMode ? (
                    <EditSongForm
                      {...song}
                      cancelView={() => setEditingSongId(null)}
                      refreshUpdatedSong={(updatedSong) => {
                        refreshUpdatedSong?.(updatedSong);
                        setEditingSongId(null);
                      }}
                    />
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <strong className="font-semibold">{song.name}</strong> -
                        Version: {song.version} - Level: {song.level} - Impact:{' '}
                        {song.bodyImpact} - Avg Kcal: {song.kcalsAverage}
                      </div>
                      <div className="flex gap-2">
                        {showEditMode && (
                          <button
                            onClick={() => setEditingSongId(song.id)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                        )}
                        {sessionId &&
                          (selectedSongId === song.id ? (
                            <DanceLogForm
                              songId={song.id}
                              sessionId={sessionId}
                              setView={() => handleDanceLogComplete(song.id)}
                            />
                          ) : (
                            <button
                              onClick={() => setSelectedSongId(song.id)}
                              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                            >
                              Log
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface AllSongsListProps {
  songs: Song[];
  sessionId?: string;
  onDanceLogCreated?: (songId: string) => void;
  refreshUpdatedSong?: (song: Song) => void;
  showEditMode?: boolean;
}
