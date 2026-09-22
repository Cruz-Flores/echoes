import { useResource } from './useResource';

export type CreateDanceLogParams = {
  id: string;
  kcal: number;
  session: number;
  songId: string;
};

export const useDanceLog = () => {
  const {
    service: { create },
  } = useResource('dance-logs');

  return {
    useCreate: ({ id, kcal, session, songId }: CreateDanceLogParams) => {
      return create({
        id,
        kcal,
        session,
        songId,
      });
    },
  };
};
