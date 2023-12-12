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

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  kcal: number;

  @Column({ nullable: false, type: 'int' })
  session: number;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
