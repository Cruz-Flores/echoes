import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SongDAO } from './song.dao';
import { SongEntity } from './entities/song.entity';
import { SongsController } from './songs.controller';
import { SongService } from './song.service';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  controllers: [SongsController],
  providers: [SongService, SongDAO],
  exports: [SongService],
})
export class SongsModule {}
