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
  bodyImpact: number;
};

@Injectable()
export class SongService {
  constructor(private readonly songRepository: SongRepository) {}

  async create({
    id,
    level,
    perceivedLevel,
    version,
    name,
    bodyImpact,
  }: CreateSongParams) {
    const song = Song.of({
      id,
      level,
      perceivedLevel,
      version,
      name,
      bodyImpact,
    });
    await this.songRepository.save(song);

    return song;
  }

  // TODO: Crear mapper de respuesta en creacion y actualizacion
  async update({
    id,
    level,
    perceivedLevel,
    version,
    name,
    bodyImpact,
  }: CreateSongParams) {
    const song = await this.songRepository.findOne({
      where: JSON.stringify({ id: { eq: id } }),
    });
    song.update({
      level,
      perceivedLevel,
      version,
      name,
      bodyImpact,
    });
    await this.songRepository.save(song);

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
