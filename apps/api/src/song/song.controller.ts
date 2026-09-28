import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateSongDTO } from './dtos/create-song.dto';
import { FilterDTO } from '../common/filter.dto';
import { SongService } from './song.service';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(
    @Body()
    { id, level, perceivedLevel, version, name, bodyImpact }: CreateSongDTO,
  ) {
    return this.songService.create({
      id,
      level,
      perceivedLevel,
      version,
      name,
      bodyImpact,
    });
  }

  // TODO: Crear dto de actualización que no permita actualizar el id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    { level, perceivedLevel, version, name, bodyImpact }: CreateSongDTO,
  ) {
    return this.songService.update({
      id,
      level,
      perceivedLevel,
      version,
      name,
      bodyImpact,
    });
  }

  @Get()
  getAll(
    @Query() { where, limit, offset, page, orderBy, orderType }: FilterDTO,
  ) {
    return this.songService.getAll({
      where,
      limit,
      offset,
      page,
      orderBy,
      orderType,
    });
  }
}
