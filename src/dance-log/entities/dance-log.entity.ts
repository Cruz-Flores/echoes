import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SongEntity } from '../../songs/entities/song.entity';

@Entity('dance_logs')
export class DanceLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SongEntity, (song) => song.danceLogs, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  song: SongEntity;

  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
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
