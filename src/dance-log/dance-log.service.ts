import { Injectable } from '@nestjs/common';

import { DanceLog } from './dance-log';
import { DanceLogRepository } from './interfaces/dance-log.repository';
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
    const song = await this.songRepository.findOne({
      where: { id: songId },
    });
    const danceLog = DanceLog.of({
      id,
      kcal,
      session,
    });
    danceLog.assignSong(song);
    await this.danceLogRepository.save(danceLog);

    return danceLog;
  }
}
