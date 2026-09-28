import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DanceLogModule } from '../dance-log/dance-log.module';
import { SongController } from './song.controller';
import { SongEntity } from './typeorm/entities/song.entity';
import { SongRepository } from './interfaces/song.repository';
import { SongService } from './song.service';
import { SongTypeormRepository } from './typeorm/repositories/song.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SongEntity]),
    forwardRef(() => DanceLogModule),
  ],
  controllers: [SongController],
  providers: [
    SongService,
    { provide: SongRepository, useClass: SongTypeormRepository },
  ],
  exports: [SongRepository],
})
export class SongModule {}
