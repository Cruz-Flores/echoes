import { Injectable } from '@nestjs/common';
import { Version } from '@echoes/core';

import { SongDAO } from './song.dao';

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
}
