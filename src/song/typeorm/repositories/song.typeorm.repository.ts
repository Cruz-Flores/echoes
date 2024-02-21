import { Between, IsNull, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { buildDynamicFilters } from '../../../common/helpers/typeorm/build-dynamic-filters.helper';
import { DanceLogEntity } from '../../../dance-log/typeorm/entities/dance-log.entity';
import { Song } from '../../song';
import { SongEntity } from '../entities/song.entity';
import { SongRepository } from '../../interfaces/song.repository';

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
      if (songIds.length > 0) {
        qb.andWhere('song.id NOT IN (:...songIds)', { songIds });
      }
    }

    return qb;
  }

  async getSongsIds(): Promise<string[]> {
    const songsCount = await this.repository.count();
    const { lastSession } = await this.repository
      .createQueryBuilder('song')
      .select('MAX(danceLogs.session)', 'lastSession')
      .leftJoin('song.danceLogs', 'danceLogs')
      .getRawOne<{ lastSession: number }>();
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
    /**
     * Si el promedio de canciones por sesión es nulo o 0 o la ultima sesion es
     * nula o 0, no se ha bailado, por lo que no hay canciones que excluir
     */
    if (!songsPerSessionAvg || !lastSession) {
      return [];
    }
    const backwardSessions =
      Math.ceil(songsCount / Math.ceil(Number(songsPerSessionAvg))) - 1;

    const songs = await this.repository.find({
      where: [
        {
          danceLogs: {
            session: Between(
              lastSession - backwardSessions > 0
                ? lastSession - backwardSessions
                : 0,
              lastSession,
            ),
          },
        },
      ],
    });
    /**
     * Si el numero de canciones es igual a el numero de canciones a excluir
     * no se excluye ninguna cancion ya que todas las canciones han sido bailadas
     * y por tanto deberia mostrar recorrer una sesion hacia adelante
     */
    if (songs.length === songsCount) {
      return [];
    }

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
