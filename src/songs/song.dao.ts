import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseDAO } from '../common/daos/base.dao';
import { SongEntity } from './entities/song.entity';

export class SongDAO extends BaseDAO<SongEntity> {
  constructor(
    @InjectRepository(SongEntity)
    private _repository: Repository<SongEntity>,
  ) {
    super(_repository);
  }
}
