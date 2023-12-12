import { Injectable } from '@nestjs/common';

import { DanceLog } from './dance-log';
import { DanceLogRepository } from './interfaces/dance-log.repository';
import { Song } from '../song/song';
import { SongRepository } from '../song/interfaces/song.repository';

type CreateDanceLogParams = {
  id: string;
  songId: string;
  kcal: number;
  session: number;
};

@Injectable()
export class DanceLogService {
  constructor(
    private readonly danceLogRepository: DanceLogRepository,
    private readonly songRepository: SongRepository,
  ) {}

  async create({ id, songId, kcal, session }: CreateDanceLogParams) {
    // TODO: pasar las condiciones como string esta feo
    const song = await this.songRepository.findOne({
      where: JSON.stringify({ id: { eq: songId } }),
    });
    const danceLog = DanceLog.of({
      id,
      kcal,
      session,
    });
    danceLog.assignSong(song);
    await this.danceLogRepository.save(danceLog);
    // TODO: mover esto a un evento
    await this.recalculateSongKcalsAverage(song);

    return danceLog;
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
