import { Version } from '@echoes/core';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DanceLogEntity } from '../../dance-log/entities/dance-log.entity';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => DanceLogEntity, (danceLog) => danceLog.song)
  danceLogs: DanceLogEntity[];

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'int' })
  level: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'perceived_level',
  })
  perceivedLevel: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Version,
  })
  version: Version;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
