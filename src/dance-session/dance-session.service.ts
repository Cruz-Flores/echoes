import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DanceSession } from './dance-session';
import { DanceSessionRepository } from './interfaces/dance-session.repository';

type CreateDanceSessionParams = {
  targetSongsCount: number;
};

type UpdateDanceSessionParams = {
  id: string;
  endedAt: Date;
};

@Injectable()
export class DanceSessionService {
  constructor(
    private readonly danceSessionRepository: DanceSessionRepository,
  ) {}

  async create({ targetSongsCount }: CreateDanceSessionParams) {
    const danceSession = DanceSession.of({
      id: uuidv4(),
      startedAt: new Date(),
      targetSongsCount,
    });
    await this.danceSessionRepository.save(danceSession);

    return danceSession;
  }

  async update({ id, endedAt }: UpdateDanceSessionParams) {
    const danceSession = await this.danceSessionRepository.findOne({
      where: JSON.stringify({ id: { eq: id } }),
    });
    danceSession.close();
    await this.danceSessionRepository.save(danceSession);

    return danceSession;
  }
}
