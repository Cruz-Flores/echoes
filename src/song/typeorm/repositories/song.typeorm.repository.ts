import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Between, IsNull, Repository, SelectQueryBuilder } from 'typeorm';

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
      bodyImpact: song.getBodyImpact(),
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
    const queryBuilder = new FilterBuilder(this.repository, 'song');
    const { danceLogView, ...filterObject } = JSON.parse(where);
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
    const qb = queryBuilder.build(conditions);
    if (danceLogView?.eq === 'true') {
      const songIds = await this.getSongsIds();
      qb.andWhere('song.id IN (:...songIds)', { songIds });
    }

    return qb;
  }

  async getSongsIds(): Promise<string[]> {
    const songsCount = await this.repository.count();
    const lastSession =
      (
        await this.repository
          .createQueryBuilder('song')
          .select('MAX(danceLogs.session)', 'lastSession')
          .leftJoin('song.danceLogs', 'danceLogs')
          .getRawOne()
      ).lastSession ?? 0;
    const songsPerSessionAvg = (
      await this.repository
        .createQueryBuilder('dance_log')
        .select('AVG(num_canciones)', 'songsPerSessionAvg')
        .from((subQuery) => {
          return subQuery
            .select('session, COUNT(*)', 'num_canciones')
            .from(DanceLogEntity, 'dance_log')
            .groupBy('session');
        }, 'conteo_sesiones')
        .getRawOne()
    ).songsPerSessionAvg;
    const backwardSessions = songsPerSessionAvg
      ? Math.ceil(songsCount / Math.ceil(Number(songsPerSessionAvg)))
      : 0;
    const targetSession = lastSession - backwardSessions;
    const songs = await this.repository.find({
      where: [
        {
          danceLogs: {
            session: Between(
              targetSession - 2 > 0 ? targetSession - 2 : 0,
              targetSession,
            ),
          },
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
    bodyImpact,
  }: SongEntity): Song {
    return Song.of({
      id,
      kcalsAverage,
      level,
      version,
      perceivedLevel,
      name,
      bodyImpact,
    });
  }
}
