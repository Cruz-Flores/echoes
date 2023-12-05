import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseDAO<Entity> {
  protected constructor(protected _baseRepository: Repository<Entity>) {}

  getOneWhere(conditions: FindOptionsWhere<Entity>) {
    return this._baseRepository.findOne(conditions);
  }

  save(data: DeepPartial<Entity>) {
    return this._baseRepository.save(data);
  }
}
