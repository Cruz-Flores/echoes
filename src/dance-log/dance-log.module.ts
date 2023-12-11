import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DanceLogController } from './dance-log.controller';
import { DanceLogDAO } from './daos/dance-log.dao';
import { DanceLogEntity } from './entities/dance-log.entity';
import { DanceLogService } from './dance-log.service';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanceLogEntity]),
    forwardRef(() => SongModule),
  ],
  providers: [DanceLogService, DanceLogDAO],
  controllers: [DanceLogController, DanceLogController],
  exports: [DanceLogService],
})
export class DanceLogModule {}
