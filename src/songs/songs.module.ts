import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongService } from './song.service';

@Module({
  controllers: [SongsController],
  providers: [SongService],
})
export class SongsModule {}
