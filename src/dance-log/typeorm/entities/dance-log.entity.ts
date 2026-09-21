import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  DecimalTransformer,
  SongEntity,
} from '../../../song/typeorm/entities/song.entity';
import { DanceSessionEntity } from '../../../dance-session/typeorm/entities/dance-session.entity';

@Entity('dance_logs')
export class DanceLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SongEntity, (song) => song.danceLogs, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'song_id' })
  song: SongEntity;

  // TODO: solo mientras no se pueda hacer el join con el song
  @Column({ nullable: false, type: 'char', name: 'song_id' })
  songId: string;

  @ManyToOne(() => DanceSessionEntity, (session) => session.danceLogs, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'session_id' })
  session: DanceSessionEntity;

  @Column({ nullable: false, type: 'char', name: 'session_id' })
  sessionId: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  kcal: number;

  @Column({
    nullable: false,
    type: 'boolean',
    name: 'was_omitted',
    default: false,
  })
  wasOmitted: boolean;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'danced_at',
  })
  dancedAt: Date;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
