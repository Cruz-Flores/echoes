import { v4 as uuidv4 } from 'uuid';

import { useField } from '../../../shared/hooks/useField';
import { useSongs } from '../hooks/useSong';
import type { Song } from '../../../shared/types';

export interface SongFormProps {
  refreshSongs: (song: Song) => void;
}

export function SongForm({ refreshSongs }: SongFormProps) {
  const {
    input: { value: nameInput, ...nameInputProps },
    reset: resetNameInput,
  } = useField('text');
  const {
    input: { value: levelInput, ...levelInputProps },
    reset: resetLevelInput,
  } = useField('number');
  const {
    input: { value: perceivedLevelInput, ...perceivedLevelInputProps },
    reset: resetPerceivedlevelInput,
  } = useField('number');
  const {
    input: { value: bodyImpactInput, ...bodyImpactInputProps },
    reset: resetBodyImpactInput,
  } = useField('number');
  const {
    input: { value: versionInput, ...versionInputProps },
    reset: resetVersionInput,
  } = useField('select', 'Exceed to Zero');
  const { useCreate: createSong } = useSongs();

  const addSong = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const songCreated = await createSong({
      id: uuidv4(),
      name: nameInput,
      level: +levelInput,
      perceivedLevel: +perceivedLevelInput,
      bodyImpact: +bodyImpactInput,
      version: versionInput,
    });
    refreshSongs(songCreated);
    resetNameInput();
    resetLevelInput();
    resetPerceivedlevelInput();
    resetBodyImpactInput();
    resetVersionInput();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={addSong}>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Name:</span>
        <input
          value={nameInput}
          {...nameInputProps}
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Level:</span>
        <input
          value={levelInput}
          {...levelInputProps}
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">
          Perceived Level:
        </span>
        <input
          value={perceivedLevelInput}
          {...perceivedLevelInputProps}
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Body Impact:</span>
        <input
          value={bodyImpactInput}
          {...bodyImpactInputProps}
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Version:</span>
        <select
          value={versionInput}
          {...versionInputProps}
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1st to Perfect Collection">
            1st to Perfect Collection
          </option>
          <option value="Extra to Prex 3">Extra to Prex 3</option>
          <option value="Exceed to Zero">Exceed to Zero</option>
          <option value="NX to NX Absolute">NX to NX Absolute</option>
          <option value="Fiesta to Fiesta 2">Fiesta to Fiesta 2</option>
          <option value="Prime">Prime</option>
          <option value="Prime 2">Prime 2</option>
          <option value="XX">XX</option>
          <option value="Pro to Pro 2">Pro to Pro 2</option>
          <option value="Infinity">Infinity</option>
        </select>
      </label>
      <button
        type="submit"
        className="w-[100px] px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        crear
      </button>
    </form>
  );
}
