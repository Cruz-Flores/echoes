import { Injectable } from '@nestjs/common';
import { Version } from '@echoes/core';

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

  getAll(q: any) {
    return this.songRepository.findAll(q);
  }
}
