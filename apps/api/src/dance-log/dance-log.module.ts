import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DanceLogController } from './dance-log.controller';
import { DanceLogEntity } from './typeorm/entities/dance-log.entity';
import { DanceLogRepository } from './interfaces/dance-log.repository';
import { DanceLogService } from './dance-log.service';
import { DanceLogTypeormRepository } from './typeorm/repositories/dance-log.typeorm.repository';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanceLogEntity]),
    forwardRef(() => SongModule),
  ],
  providers: [
    DanceLogService,
    { provide: DanceLogRepository, useClass: DanceLogTypeormRepository },
  ],
  controllers: [DanceLogController, DanceLogController],
  exports: [DanceLogService],
})
export class DanceLogModule {}
