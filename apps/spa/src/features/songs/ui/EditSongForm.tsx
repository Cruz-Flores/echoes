import type { Song } from '../../../shared/types';
import { useField } from '../../../shared/hooks/useField';
import { useSongs } from '../hooks/useSong';

export const EditSongForm = ({
  cancelView,
  bodyImpact,
  level,
  name,
  perceivedLevel,
  version,
  id,
  refreshUpdatedSong,
}: EditSongFormProps) => {
  const {
    input: { value: nameInput, ...nameInputProps },
    reset: resetNameInput,
  } = useField('text', name);
  const {
    input: { value: levelInput, ...levelInputProps },
    reset: resetLevelInput,
  } = useField('number', level.toString());
  const {
    input: { value: perceivedLevelInput, ...perceivedLevelInputProps },
    reset: resetPerceivedlevelInput,
  } = useField('number', perceivedLevel.toString());
  const {
    input: { value: bodyImpactInput, ...bodyImpactInputProps },
    reset: resetBodyImpactInput,
  } = useField('number', bodyImpact.toString());
  const {
    input: { value: versionInput, ...versionInputProps },
    reset: resetVersionInput,
  } = useField('select', version || 'Exceed to Zero');
  const { useUpdate: editSong } = useSongs();

  const updateSong = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const songUpdated = await editSong({
      id,
      name: nameInput,
      level: +levelInput,
      perceivedLevel: +perceivedLevelInput,
      bodyImpact: +bodyImpactInput,
      version: versionInput,
    });
    refreshUpdatedSong(songUpdated as Song);
    resetNameInput();
    resetLevelInput();
    resetPerceivedlevelInput();
    resetBodyImpactInput();
    resetVersionInput();
    cancelView();
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-lg font-semibold mb-3 text-gray-800">edit</p>
      <form className="flex flex-col gap-3" onSubmit={updateSong}>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Name:</span>
          <input
            value={nameInput}
            {...nameInputProps}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Level:</span>
          <input
            value={levelInput}
            {...levelInputProps}
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">
            Body Impact:
          </span>
          <input
            value={bodyImpactInput}
            {...bodyImpactInputProps}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Version:</span>
          <select
            value={versionInput}
            {...versionInputProps}
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
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            editar
          </button>
          <button
            type="button"
            onClick={cancelView}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export interface EditSongFormProps {
  cancelView: () => void;
  refreshUpdatedSong: (song: Song) => void;
  name: string;
  level: number;
  perceivedLevel: number;
  bodyImpact: number;
  version?: string;
  id: string;
}
