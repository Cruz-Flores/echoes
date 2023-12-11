import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateSongDTO } from './dtos/create-song.dto';
import { FilterDTO } from '../common/filter.dto';
import { SongService } from './song.service';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(@Body() { id, level, perceivedLevel, version, name }: CreateSongDTO) {
    return this.songService.create({
      id,
      level,
      perceivedLevel,
      version,
      name,
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
