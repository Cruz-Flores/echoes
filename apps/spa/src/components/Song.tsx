import { useState } from 'react';

import { DanceLogForm } from './DanceLogForm';
import { EditSongForm } from './EditSongForm';

const colors = [
  'e2efda',
  'c6e0b4',
  'fff2cc',
  'ffd966',
  'fce4d6',
  'f8cbad',
  'f4b084',
];

export const Song = (props: SongProps) => {
  const {
    name,
    kcalsAverage,
    session,
    id,
    level,
    bodyImpact,
    perceivedLevel,
    version,
    refreshUpdatedSong,
  } = props;
  const [view, setView] = useState(true);
  const [isEditView, setIsEditView] = useState(false);

  return (
    <>
      {view &&
        (isEditView ? (
          <EditSongForm
            refreshUpdatedSong={refreshUpdatedSong}
            cancelView={() => setIsEditView(false)}
            name={name}
            level={level}
            bodyImpact={bodyImpact}
            perceivedLevel={perceivedLevel}
            version={version}
            id={id}
          />
        ) : (
          <li
            className="flex items-center mb-3 p-4 rounded-lg shadow-sm"
            style={{
              backgroundColor: `#${colors[bodyImpact]}`,
            }}
          >
            <div className="mr-5 flex-grow">
              <p className="font-bold text-gray-800">
                {name.toUpperCase()} -{' '}
                <span className="text-red-600 font-semibold">
                  LEVEL {level}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                average {kcalsAverage} kcal
              </p>
            </div>
            <div className="flex gap-2">
              <DanceLogForm session={session} setView={setView} songId={id} />
              <button
                onClick={() => setIsEditView(!isEditView)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                editar
              </button>
            </div>
          </li>
        ))}
    </>
  );
};

export interface SongProps {
  id: string;
  name: string;
  kcalsAverage: number;
  session: number;
  level: number;
  bodyImpact: number;
  perceivedLevel: number;
  version: string;
  refreshUpdatedSong: (song: any) => void;
}
