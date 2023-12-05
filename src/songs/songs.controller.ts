import { Body, Controller, Post } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create-song.dto';

@Controller('songs')
export class SongsController {
  @Post()
  create(@Body() { id, level, perceivedLevel, type }: CreateSongDTO) {
    return { id, level, perceivedLevel, type };
  }
}
