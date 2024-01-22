import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { buildDynamicFilters } from '../../../common/helpers/typeorm/build-dynamic-filters.helper';
import { DanceLog } from '../../dance-log';
import { DanceLogEntity } from '../entities/dance-log.entity';
import { DanceLogRepository } from '../../interfaces/dance-log.repository';
import { Song } from '../../../song/song';

export class DanceLogTypeormRepository implements DanceLogRepository {
  constructor(
    @InjectRepository(DanceLogEntity)
    private readonly repository: Repository<DanceLogEntity>,
  ) {}

  async findOne({ where }: any): Promise<DanceLog> {
    const row = await this.buildQueryBuilder({
      where,
    }).getOne();
    if (!row) {
      throw new NotFoundException('Dance log not found');
    }

    return this.build(row);
  }

  async findAll({
    where,
    limit,
    page,
    orderBy,
    orderType,
  }: any): Promise<DanceLog[]> {
    const raws = await this.buildQueryBuilder({
      where,
      limit,
      page,
      orderBy,
      orderType,
    }).getMany();

    return raws.map((raw) => this.build(raw));
  }

  async save(danceLog: DanceLog): Promise<void> {
    const danceLogEntity = this.repository.create({
      id: danceLog.getId(),
      kcal: danceLog.getKcal(),
      session: danceLog.getSession(),
      song: danceLog.getSong(),
    });
    await this.repository.save(danceLogEntity);

    return void 0;
  }

  buildQueryBuilder({
    where,
    limit,
    page,
    orderBy,
    orderType,
  }: any): SelectQueryBuilder<DanceLogEntity> {
    const queryBuilder = new FilterBuilder(this.repository, 'danceLog');
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
    const qb = queryBuilder.build(conditions);
    qb.leftJoinAndSelect('danceLog.song', 'song');

    return qb;
  }

  build({
    id,
    kcal,
    session,
    song: {
      id: songId,
      level,
      name,
      version,
      perceivedLevel,
      kcalsAverage,
      bodyImpact,
    },
  }: DanceLogEntity): DanceLog {
    const song = Song.of({
      id: songId,
      level,
      name,
      version,
      perceivedLevel,
      kcalsAverage,
      bodyImpact,
    });
    const danceLog = DanceLog.of({
      id,
      kcal,
      session,
    });
    danceLog.assignSong(song);

    return danceLog;
  }
}
