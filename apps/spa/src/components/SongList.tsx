import { Song } from './Song';

export const SongList = (props: SongListProps) => {
  const { songs, session, refreshUpdatedSong } = props;

  const validSongs = songs.filter(
    (song) => song && song.perceivedLevel != null && song.name,
  );

  const songsByPerceivedLevel = validSongs.reduce(
    (acc, song) => {
      const level = song.perceivedLevel;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(song);
      return acc;
    },
    {} as Record<number, SongProps[]>,
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

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {validSongs.length} canciones
      </h2>
      {perceivedLevels.map((level) => (
        <div key={level} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Nivel percibido {level}
          </h3>
          <ul className="list-none space-y-2">
            {songsByPerceivedLevel[level].map((song) => {
              return (
                <Song
                  key={song.id}
                  {...song}
                  session={session}
                  refreshUpdatedSong={refreshUpdatedSong}
                />
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export interface SongListProps {
  songs: SongProps[];
  session: number;
  refreshUpdatedSong: (song: SongProps) => void;
}

export interface SongProps {
  id: string;
  name: string;
  level: number;
  perceivedLevel: number;
  kcalsAverage: number;
  version: string;
  bodyImpact: number;
}
