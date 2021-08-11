import AggregateRoot from 'application/domain/model/entities/AggregateRoot';
import DestroyableRepository from './DestroyableRepository';
import ReadableRepository from './ReadableRepository';
import WritableRepository from './WritableRepository';

/**
 * Interface for repositories that allow to get by id, create, update and delete entities.
 *
 * @export
 * @interface Repository
 * @extends {ReadableRepository<T, TID>}
 * @extends {WritableRepository<T, TID>}
 * @extends {DestroyableRepository<T, TID>}
 * @template T
 * @template TID
 */
export default interface Repository<T extends AggregateRoot<TID>, TID> 
    extends ReadableRepository<T, TID>, 
            WritableRepository<T, TID>, 
            DestroyableRepository<T, TID> {
}
