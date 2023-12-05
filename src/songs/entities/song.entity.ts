import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Version {
  ExceedToZero = 'Exceed to Zero',
}

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'int' })
  level: number;

  @Column({ nullable: false, type: 'int' })
  perceivedLevel: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Version,
  })
  version: Version;
}
