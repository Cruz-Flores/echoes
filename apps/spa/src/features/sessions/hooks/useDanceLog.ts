import { useResource } from '../../../shared/hooks/useResource';
import type { DanceLog } from '../../../shared/types';

const API_URL = 'dance-logs';

export type CreateDanceLogParams = {
  id: string;
  kcal: number;
  sessionId: string;
  songId: string;
  wasOmitted?: boolean;
  dancedAt: string;
};

export const useDanceLog = () => {
  const {
    service: { create, getAll },
  } = useResource(API_URL);

  const createDanceLog = async (
    params: CreateDanceLogParams,
  ): Promise<DanceLog> => {
    return create(params);
  };

  const getRecentLogs = async (
    orderBy = 'dancedAt',
    orderType: 'ASC' | 'DESC' = 'DESC',
    limit?: number,
  ): Promise<DanceLog[]> => {
    return getAll({ orderBy, orderType, ...(limit && { limit }) });
  };

  return {
    createDanceLog,
    getRecentLogs,
  };
};
