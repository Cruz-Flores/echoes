import { Repository, SelectQueryBuilder } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { buildDynamicFilters } from '../../../common/helpers/typeorm/build-dynamic-filters.helper';
import { DanceSession } from '../../dance-session';
import { DanceSessionEntity } from '../entities/dance-session.entity';
import { DanceSessionRepository } from '../../interfaces/dance-session.repository';

export class DanceSessionTypeormRepository implements DanceSessionRepository {
  constructor(
    @InjectRepository(DanceSessionEntity)
    private readonly repository: Repository<DanceSessionEntity>,
  ) {}

  async findOne({ where }: any): Promise<DanceSession> {
    const row = await (
      await this.buildQueryBuilder({
        where,
      })
    ).getOne();
    if (!row) {
      throw new NotFoundException('Dance session not found');
    }

    return this.build(row);
  }

  async findAll({
    where,
    limit,
    page,
    orderBy,
    orderType,
  }: any): Promise<DanceSession[]> {
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

  async save(danceSession: DanceSession): Promise<void> {
    const danceSessionEntity = this.repository.create({
      id: danceSession.getId(),
      startedAt: danceSession.getStartedAt(),
      endedAt: danceSession.getEndedAt(),
      targetSongsCount: danceSession.getTargetSongsCount(),
    });
    await this.repository.save(danceSessionEntity);

    return void 0;
  }

  async buildQueryBuilder({
    where = '{}',
    limit,
    page,
    orderBy,
    orderType,
  }: any): Promise<SelectQueryBuilder<DanceSessionEntity>> {
    const queryBuilder = new FilterBuilder(this.repository, 'dance_session');
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

    const query = queryBuilder.build(conditions);

    return query;
  }

  private build(entity: DanceSessionEntity): DanceSession {
    return DanceSession.of({
      id: entity.id,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      targetSongsCount: entity.targetSongsCount,
    });
  }
}
