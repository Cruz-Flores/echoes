import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DanceLogController } from './dance-log.controller';
import { DanceLogDummyRepository } from './dummies/dance-log.dummy.repository';
import { DanceLogEntity } from './entities/dance-log.entity';
import { DanceLogRepository } from './interfaces/dance-log.repository';
import { DanceLogService } from './dance-log.service';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanceLogEntity]),
    forwardRef(() => SongModule),
  ],
  providers: [
    DanceLogService,
    { provide: DanceLogRepository, useClass: DanceLogDummyRepository },
  ],
  controllers: [DanceLogController, DanceLogController],
  exports: [DanceLogService],
})
export class DanceLogModule {}
