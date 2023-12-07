import { Injectable } from '@nestjs/common';
import { Version } from '@echoes/core';

import { FindOneParams } from '../common/daos/base.dao';
import { SongDAO } from './daos/song.dao';
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
    return this.songDao.getAll();
  }

  getOne(params: FindOneParams<SongEntity>) {
    return this.songDao.getOne(params);
  }
}
