import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseDAO<Entity> {
  protected constructor(protected _baseRepository: Repository<Entity>) {}

  getOne(conditions: FindOptionsWhere<Entity>) {
    return this._baseRepository.findOne(conditions);
  }

  save(data: Entity) {
    return this._baseRepository.save(data);
  }
}
