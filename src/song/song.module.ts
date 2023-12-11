import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DanceLogModule } from '../dance-log/dance-log.module';
import { SongController } from './song.controller';
import { SongDummyRepository } from './dummies/repositories/song.dummy.repository';
import { SongEntity } from './typeorm/entities/song.entity';
import { SongRepository } from './interfaces/song.repository';
import { SongService } from './song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SongEntity]),
    forwardRef(() => DanceLogModule),
  ],
  controllers: [SongController],
  providers: [
    SongService,
    { provide: SongRepository, useClass: SongDummyRepository },
  ],
  exports: [SongRepository],
})
export class SongModule {}
