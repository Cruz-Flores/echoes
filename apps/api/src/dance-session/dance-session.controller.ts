import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { CreateDanceSessionDTO } from './dtos/create-dance-session.dto';
import { DanceSessionService } from './dance-session.service';
import { UpdateDanceSessionDTO } from './dtos/update-dance-session.dto';

@Controller('dance-sessions')
export class DanceSessionController {
  constructor(private readonly danceSessionService: DanceSessionService) {}

  @Post()
  create(@Body() { targetSongsCount }: CreateDanceSessionDTO) {
    return this.danceSessionService.create({
      targetSongsCount,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() { endedAt }: UpdateDanceSessionDTO) {
    return this.danceSessionService.update({
      id,
      endedAt: new Date(endedAt),
    });
  }
}
