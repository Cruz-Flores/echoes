import { Module } from '@nestjs/common';

import { DanceLogController } from './dance-log.controller';
import { DanceLogDAO } from './daos/dance-log.dao';
import { DanceLogEntity } from './entities/dance-log.entity';
import { DanceLogService } from './dance-log.service';
import { SongsModule } from 'src/songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DanceLogEntity]), SongsModule],
  providers: [DanceLogService, DanceLogDAO],
  controllers: [DanceLogController],
})
export class DanceLogModule {}
