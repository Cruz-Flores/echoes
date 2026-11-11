import { Version } from '../../../common/enums/version.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {
  DecimalTransformer,
  IntTransformer,
} from '../../../common/helpers/typeorm/transformers';
import { DanceLogEntity } from '../../../dance-log/typeorm/entities/dance-log.entity';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => DanceLogEntity, (danceLog) => danceLog.song)
  danceLogs!: DanceLogEntity[];

  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ nullable: false, type: 'int', transformer: new IntTransformer() })
  level!: number;

  @Column({
    nullable: false,
    type: 'int',
    transformer: new IntTransformer(),
    name: 'body_impact',
  })
  bodyImpact!: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'perceived_level',
    transformer: new DecimalTransformer(),
  })
  perceivedLevel!: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'kcals_average',
    transformer: new DecimalTransformer(),
  })
  kcalsAverage!: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Version,
  })
  version!: Version;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
