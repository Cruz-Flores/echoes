import { Injectable } from '@nestjs/common';
import { Version } from '@echoes/core';

import { OrderType } from '../common/filter.dto';
import { Song } from './song';
import { SongRepository } from './interfaces/song.repository';

type CreateSongParams = {
  id: string;
  level: number;
  perceivedLevel: number;
  version: Version;
  name: string;
};

@Injectable()
export class SongService {
  constructor(private readonly songRepository: SongRepository) {}

  create({ id, level, perceivedLevel, version, name }: CreateSongParams) {
    const song = Song.of({
      id,
      level,
      perceivedLevel,
      version,
      name,
    });
    this.songRepository.save(song);

    return song;
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
    limit: number;
    offset: number;
    page: number;
    orderBy: string;
    orderType: OrderType;
  }): Promise<Song[]> {
    return this.songRepository.findAll({
      where,
      limit,
      offset,
      page,
      orderBy,
      orderType,
    });
  }

  getOne(q: any): Promise<Song> {
    return this.songRepository.findOne(q);
  }
}
