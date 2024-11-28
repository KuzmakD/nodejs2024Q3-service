import { Repository } from 'typeorm';
import { AbstractEntity } from '../entities/abstract.entity';

export abstract class AbstractService<T extends AbstractEntity> {
  constructor(protected repository: Repository<T>) {}
}
