import { Injectable } from '@nestjs/common';
import { DanceLogDAO } from './daos/dance-log.dao';
import { SongService } from 'src/song/song.service';

type CreateDanceLogParams = {
  id: string;
  songId: string;
  kcal: number;
  session: number;
};

@Injectable()
export class DanceLogService {
  constructor(
    private readonly danceLogDAO: DanceLogDAO,
    private readonly songService: SongService,
  ) {}

  async create({ id, songId, kcal, session }: CreateDanceLogParams) {
    // const { id: songFindedId } = await this.songService.getOne({
    //   where: { id: songId },
    // });
    // return this.danceLogDAO.save({
    //   id,
    //   song: { id: songFindedId },
    //   kcal,
    //   session,
    // });
  }
}
