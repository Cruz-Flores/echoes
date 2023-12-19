import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

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
    const days = Math.ceil(count / 20);
    const date = new Date();
    date.setDate(date.getDate() - days);
    const songs = await this.repository
      .createQueryBuilder('song')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('danceLog.songId, MAX(danceLog.createdAt) as lastDanceLog')
            .from(DanceLogEntity, 'danceLog')
            .groupBy('"danceLog"."song_id"');
        },
        'lastDanceLog',
        '"lastDanceLog"."song_id" = song.id',
      )
      .where(
        '"lastDanceLog".lastDanceLog IS NULL OR "lastDanceLog".lastDanceLog < :sevenDaysAgo',
        { sevenDaysAgo: date },
      )
      .getMany();
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
