import { Injectable } from '@nestjs/common';

import { DanceLog } from './dance-log';
import { DanceLogRepository } from './interfaces/dance-log.repository';
import { Song } from '../song/song';
import { SongRepository } from '../song/interfaces/song.repository';
import { OrderType } from '../common/filter.dto';

type CreateDanceLogParams = {
  id: string;
  songId: string;
  sessionId: string;
  kcal: number;
  wasOmitted?: boolean;
  dancedAt: Date;
};

@Injectable()
export class DanceLogService {
  constructor(
    private readonly danceLogRepository: DanceLogRepository,
    private readonly songRepository: SongRepository,
  ) {}

  async create({
    id,
    songId,
    sessionId,
    kcal,
    wasOmitted = false,
    dancedAt,
  }: CreateDanceLogParams) {
    // TODO: pasar las condiciones como string esta feo
    const song = await this.songRepository.findOne({
      where: JSON.stringify({ id: { eq: songId } }),
    });
    const danceLog = DanceLog.of({
      id,
      kcal,
      sessionId,
      wasOmitted,
      dancedAt,
    });
    danceLog.assignSong(song);
    await this.danceLogRepository.save(danceLog);
    // TODO: mover esto a un evento
    // TODO: durante el flujo al tratarse de un solo objeto se modifica, atencion a esto
    await this.recalculateSongKcalsAverage(song);

    return danceLog;
  }

  getAll({
    limit,
    offset,
    orderBy,
    orderType,
    page,
    where,
  }: {
    where: string;
    limit?: number;
    offset?: number;
    page?: number;
    orderBy?: string;
    orderType?: OrderType;
  }): Promise<DanceLog[]> {
    return this.danceLogRepository.findAll({
      where,
      limit,
      offset,
      page,
      orderBy,
      orderType,
    });
  }

  async recalculateSongKcalsAverage(song: Song): Promise<void> {
    const lastDanceLogs = await this.danceLogRepository.findAll({
      where: JSON.stringify({ songId: { eq: song.getId() } }),
      limit: 7,
      orderBy: 'createdAt',
      orderType: 'DESC',
    });
    song.calculateKcalsAverage(lastDanceLogs);

    return this.songRepository.save(song);
  }
}
