import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { BaseDAO } from '../../common/daos/base.dao';
import { SongEntity } from '../entities/song.entity';

export class SongDAO extends BaseDAO<SongEntity> {
  constructor(
    @InjectRepository(SongEntity)
    private _repository: Repository<SongEntity>,
  ) {
    super(_repository);
  }

  //un dao se casa con la tecnologia? de que manera se hace simple y escalable? es un tradeoff?
  getOne(conditions: FindOneOptions<SongEntity>): Promise<SongEntity> {
    const song = this._repository.findOne(conditions);
    if (!song) {
      throw new NotFoundException(`Song with not found`);
    }

    return song;
  }

  getAll(): Promise<SongEntity[]> {
    const filterQueryBuilder = new FilterBuilder(this._repository, 'song');

    const queryFilter: IFilterQuery = {
      filterBy: ['name'],
      filterType: ['eq'],
      filterValue: ['Lake Roma'],
      page: 1,
      per_page: 10,
      orderBy: 'level',
      orderType: 'ASC',
    };

    const queryBuilder = filterQueryBuilder.build(queryFilter);
    return queryBuilder.getMany();
  }
}
