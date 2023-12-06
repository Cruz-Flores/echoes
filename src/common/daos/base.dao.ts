import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

//si se expone el tipo de los parametros de busqueda se casa a quien los use con la tecnologia
export type FindOneParams<Entity> = FindOneOptions<Entity>;

//de que manera se reutilzan los metodos y a la vez no se casa con la tecnologia???
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
