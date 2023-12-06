import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseDAO } from '../../common/daos/base.dao';
import { DanceLogEntity } from '../entities/dance-log.entity';

export class DanceLogDAO extends BaseDAO<DanceLogEntity> {
  constructor(
    @InjectRepository(DanceLogEntity)
    private _repository: Repository<DanceLogEntity>,
  ) {
    super(_repository);
  }
}
