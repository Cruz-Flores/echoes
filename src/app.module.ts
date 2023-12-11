import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DanceLogModule } from './dance-log/dance-log.module';
import { DatabaseModule } from './database/database.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [DanceLogModule, DatabaseModule, SongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
