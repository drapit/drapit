import AggregateRoot from 'application/domain/model/entities/AggregateRoot';

/**
 * Interface for repositories that allow delete entities.
 *
 * @export
 * @interface DestroyableRepository
 * @template T
 * @template TID
 */
export default interface DestroyableRepository<T extends AggregateRoot<TID>, TID> {
    delete(entity: T): Promise<void>;
}
