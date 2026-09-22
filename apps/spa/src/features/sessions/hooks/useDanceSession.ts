import { useResource } from '../../../shared/hooks/useResource';
import type { DanceSession } from '../../../shared/types';

const API_URL = 'dance-sessions';

export const useDanceSession = () => {
  const {
    service: { create, patch },
  } = useResource(API_URL);

  const createSession = async (
    targetSongsCount: number,
  ): Promise<DanceSession> => {
    return create({ targetSongsCount });
  };

  const closeSession = async (id: string): Promise<DanceSession> => {
    return patch(id, { endedAt: new Date().toISOString() });
  };

  return {
    createSession,
    closeSession,
  };
};
