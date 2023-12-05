import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongService } from './song.service';
import { SongDAO } from './song.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  controllers: [SongsController],
  providers: [SongService, SongDAO],
})
export class SongsModule {}
