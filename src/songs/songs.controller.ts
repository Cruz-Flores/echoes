import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateSongDTO } from './dtos/create-song.dto';
import { GetAllSongsDTO } from './dtos/get-all-songs.dto';
import { SongService } from './song.service';

@Controller('songs')
export class SongsController {
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
  getAll(@Query() q: GetAllSongsDTO) {
    return this.songService.getAll(q);
  }
}
