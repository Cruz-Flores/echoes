import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DanceLogEntity } from '../../../dance-log/typeorm/entities/dance-log.entity';

@Entity('dance_sessions')
export class DanceSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => DanceLogEntity, (danceLog) => danceLog.session)
  danceLogs!: DanceLogEntity[];

  @Column({ nullable: false, type: 'timestamp', name: 'started_at' })
  startedAt!: Date;

  @Column({ nullable: true, type: 'timestamp', name: 'ended_at' })
  endedAt!: Date | null;

  @Column({ nullable: false, type: 'int', name: 'target_songs_count' })
  targetSongsCount!: number;
}
