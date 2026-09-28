import { useResource } from '../../../shared/hooks/useResource';

//TODO: add types to update and create
export type CreateSongParams = {
  id: string;
  level: number;
  name: string;
  perceivedLevel: number;
  version: string;
  bodyImpact: number;
};

export const useSongs = () => {
  const {
    service: { create, getAll, update },
  } = useResource('songs');

  return {
    useCreate: ({
      id,
      level,
      name,
      perceivedLevel,
      bodyImpact,
      version,
    }: CreateSongParams) => {
      return create({
        id,
        name,
        level,
        perceivedLevel,
        version,
        bodyImpact,
      });
    },
    useGetAll: (params?: object) => {
      return getAll(params);
    },
    useGetAllUnfiltered: () => {
      return getAll();
    },
    useUpdate: ({
      id,
      level,
      name,
      perceivedLevel,
      bodyImpact,
      version,
    }: CreateSongParams) => {
      return update(id, {
        id,
        name,
        level,
        perceivedLevel,
        version,
        bodyImpact,
      });
    },
  };
};
