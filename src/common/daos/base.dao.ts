import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

export abstract class BaseDAO<Entity> {
  protected constructor(protected _baseRepository: Repository<Entity>) {}

  getOne(conditions: FindOneOptions<Entity>) {
    return this._baseRepository.findOne(conditions);
  }

  save(data: DeepPartial<Entity>) {
    return this._baseRepository.save(data);
  }

  get(conditions?: FindManyOptions<Entity>) {
    return this._baseRepository.find(conditions);
  }
}
