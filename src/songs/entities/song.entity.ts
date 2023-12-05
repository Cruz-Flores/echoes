import { Version } from '@echoes/core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'int' })
  level: number;

  @Column({ nullable: false, type: 'int', name: 'perceived_level' })
  perceivedLevel: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Version,
  })
  version: Version;
}
