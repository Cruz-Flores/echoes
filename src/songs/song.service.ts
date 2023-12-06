import { Injectable, NotFoundException } from '@nestjs/common';
import { Version } from '@echoes/core';

import { FindOneParams } from '../common/daos/base.dao';
import { SongDAO } from './song.dao';
import { SongEntity } from './entities/song.entity';

type CreateSongParams = {
  id: string;
  level: number;
  perceivedLevel: number;
  version: Version;
  name: string;
};

@Injectable()
export class SongService {
  constructor(private readonly songDao: SongDAO) {}

  create({ id, level, perceivedLevel, version, name }: CreateSongParams) {
    return this.songDao.save({
      id,
      level,
      perceivedLevel,
      version,
      name,
    });
  }

  getAll() {
    return this.songDao.get();
  }

  async getOne(params: FindOneParams<SongEntity>) {
    const song = await this.songDao.getOne(params);
    if (!song) {
      throw new NotFoundException(`Song with not found`);
    }

    return song;
  }
}
