import { Body, Controller, Post } from '@nestjs/common';

import { CreateDanceLogDTO } from './dtos/create-dance-log.dto';
import { DanceLogService } from './dance-log.service';

@Controller('dance-logs')
export class DanceLogController {
  constructor(private readonly createDanceLogService: DanceLogService) {}

  @Post()
  create(@Body() { id, kcal, session, songId }: CreateDanceLogDTO) {
    return this.createDanceLogService.create({ id, kcal, session, songId });
  }
}
