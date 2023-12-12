import { Version } from '@echoes/core';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';

import { DanceLogEntity } from '../../../dance-log/typeorm/entities/dance-log.entity';

//TODO: Move this to a common place
export class DecimalTransformer implements ValueTransformer {
  to(value: number): number {
    return value;
  }
  from(value: string): number {
    return parseFloat(value);
  }
}

class IntTransformer implements ValueTransformer {
  to(value: number): number {
    return value;
  }
  from(value: string): number {
    return parseInt(value, 10);
  }
}

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => DanceLogEntity, (danceLog) => danceLog.song)
  danceLogs: DanceLogEntity[];

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'int', transformer: new IntTransformer() })
  level: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'perceived_level',
    transformer: new DecimalTransformer(),
  })
  perceivedLevel: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'kcals_average',
    transformer: new DecimalTransformer(),
  })
  kcalsAverage: number;

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
