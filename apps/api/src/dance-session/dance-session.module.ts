import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DanceSessionController } from './dance-session.controller';
import { DanceSessionEntity } from './typeorm/entities/dance-session.entity';
import { DanceSessionRepository } from './interfaces/dance-session.repository';
import { DanceSessionService } from './dance-session.service';
import { DanceSessionTypeormRepository } from './typeorm/repositories/dance-session.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DanceSessionEntity])],
  controllers: [DanceSessionController],
  providers: [
    DanceSessionService,
    {
      provide: DanceSessionRepository,
      useClass: DanceSessionTypeormRepository,
    },
  ],
  exports: [DanceSessionRepository],
})
export class DanceSessionModule {}
