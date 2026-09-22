import { useEffect, useState } from 'react';
import { AllSongsList } from '../../songs/ui/AllSongsList';
import { useSongs } from '../../songs/hooks/useSong';
import type { Song } from '../../../shared/types';

export const LogOtherSong = ({
  sessionId,
  onSongLogged,
}: LogOtherSongProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const { useGetAllUnfiltered } = useSongs();
  const getAllUnfiltered = useGetAllUnfiltered;

  useEffect(() => {
    if (isOpen && allSongs.length === 0) {
      getAllUnfiltered().then((songs) => setAllSongs(songs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleDanceLogCreated = (songId: string) => {
    setIsOpen(false);
    onSongLogged?.(songId);
  };

  if (!sessionId) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 text-base bg-green-500 text-white border-none rounded cursor-pointer mb-4 hover:bg-green-600 transition-colors"
      >
        Log Other Song
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1001]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-[90%] max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="m-0 text-2xl font-bold text-gray-800">
                Log Another Song
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-base bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
            <AllSongsList
              songs={allSongs}
              sessionId={sessionId}
              onDanceLogCreated={handleDanceLogCreated}
            />
          </div>
        </div>
      )}
    </>
  );
};

export interface LogOtherSongProps {
  sessionId: string;
  onSongLogged?: (songId: string) => void;
}
