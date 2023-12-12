import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { buildDynamicFilters } from '../../../common/helpers/typeorm/build-dynamic-filters.helper';
import { Song } from '../../song';
import { SongEntity } from '../entities/song.entity';
import { SongRepository } from '../../interfaces/song.repository';

export class SongTypeormRepository implements SongRepository {
  constructor(
    @InjectRepository(SongEntity)
    private readonly repository: Repository<SongEntity>,
  ) {}

  async findOne({ where }: any): Promise<Song> {
    const row = await this.buildQueryBuilder({
      where,
    }).getOne();
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
    const raws = await this.buildQueryBuilder({
      where,
      limit,
      page,
      orderBy,
      orderType,
    }).getMany();

    return raws.map((raw) => this.build(raw));
  }

  async save(song: Song): Promise<void> {
    const songEntity = this.repository.create({
      id: song.getId(),
      level: song.getLevel(),
      perceivedLevel: song.getPerceivedLevel(),
      version: song.getVersion(),
      name: song.getName(),
    });
    await this.repository.save(songEntity);

    return void 0;
  }

  buildQueryBuilder({
    where,
    limit,
    page,
    orderBy,
    orderType,
  }: any): SelectQueryBuilder<SongEntity> {
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

    return queryBuilder.build(conditions);
  }

  build(songEntity: SongEntity): Song {
    return Song.of({
      id: songEntity.id,
      level: songEntity.level,
      perceivedLevel: songEntity.perceivedLevel,
      version: songEntity.version,
      name: songEntity.name,
    });
  }
}
