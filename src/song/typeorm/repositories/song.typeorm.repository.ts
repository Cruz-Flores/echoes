import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  Between,
  IsNull,
  LessThan,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { buildDynamicFilters } from '../../../common/helpers/typeorm/build-dynamic-filters.helper';
import { Song } from '../../song';
import { SongEntity } from '../entities/song.entity';
import { SongRepository } from '../../interfaces/song.repository';
import { DanceLogEntity } from 'src/dance-log/typeorm/entities/dance-log.entity';

export class SongTypeormRepository implements SongRepository {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
  ) {}

  async findOne({ where }: any): Promise<Song> {
    const row = await (
      await this.buildQueryBuilder({
        where,
      })
    ).getOne();
    if (!row) {
      throw new NotFoundException('Song not found');
    }

    return this.build(row);
  }

  async findAll({
    where,
    limit,
    page,
    orderBy,
    orderType,
  }: any): Promise<Song[]> {
    const raws = await (
      await this.buildQueryBuilder({
        where,
        limit,
        page,
        orderBy,
        orderType,
      })
    ).getMany();

    return raws.map((raw) => this.build(raw));
  }

  async save(song: Song): Promise<void> {
    const songEntity = this.repository.create({
      id: song.getId(),
      level: song.getLevel(),
      perceivedLevel: song.getPerceivedLevel(),
      version: song.getVersion(),
      name: song.getName(),
      kcalsAverage: song.getKcalsAverage(),
    });
    await this.repository.save(songEntity);

    return void 0;
  }

  async buildQueryBuilder({
    where = '{}',
    limit,
    page,
    orderBy,
    orderType,
  }: any): Promise<SelectQueryBuilder<SongEntity>> {
    const songIds = await this.getSongsIds();
    const queryBuilder = new FilterBuilder(this.repository, 'song');
    const filterObject = JSON.parse(where);
    const { filterBy, filterType, filterValue } =
      buildDynamicFilters(filterObject);
    const conditions: IFilterQuery = {
      filterBy,
      filterValue,
      filterType,
      page,
      per_page: limit,
      orderBy,
      orderType,
    };

    return queryBuilder.build(conditions).whereInIds(songIds);
  }

  async getSongsIds(): Promise<string[]> {
    const count = await this.repository.count();
    const { maxSession } = await this.repository
      .createQueryBuilder('song')
      .select('MAX(danceLogs.session)', 'maxSession')
      .leftJoin('song.danceLogs', 'danceLogs')
      .getRawOne();
    const sessions = Math.ceil(count / 20);
    const sessionToFind = maxSession - sessions;
    const songs = await this.repository.find({
      where: [
        {
          danceLogs: { session: sessionToFind < 0 ? 0 : sessionToFind },
        },
        {
          danceLogs: { session: IsNull() },
        },
      ],
    });

    return songs.map((song) => song.id);
  }

  build({
    id,
    kcalsAverage,
    level,
    version,
    perceivedLevel,
    name,
  }: SongEntity): Song {
    return Song.of({
      id,
      kcalsAverage,
      level,
      version,
      perceivedLevel,
      name,
    });
  }
}
