import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { BaseDAO } from '../common/daos/base.dao';
import { SongEntity } from './entities/song.entity';

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
}
