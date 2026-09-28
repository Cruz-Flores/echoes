import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateDanceLogDTO } from './dtos/create-dance-log.dto';
import { DanceLogService } from './dance-log.service';
import { FilterDTO } from '../common/filter.dto';

@Controller('dance-logs')
export class DanceLogController {
  constructor(private readonly createDanceLogService: DanceLogService) {}

  @Post()
  create(
    @Body()
    { id, kcal, sessionId, songId, wasOmitted, dancedAt }: CreateDanceLogDTO,
  ) {
    return this.createDanceLogService.create({
      id,
      kcal,
      sessionId,
      songId,
      wasOmitted,
      dancedAt: new Date(dancedAt),
    });
  }

  @Get()
  getAll(
    @Query()
    { where = '{}', limit, offset, page, orderBy, orderType }: FilterDTO,
  ) {
    return this.createDanceLogService.getAll({
      where,
      limit,
      offset,
      page,
      orderBy,
      orderType,
    });
  }
}
