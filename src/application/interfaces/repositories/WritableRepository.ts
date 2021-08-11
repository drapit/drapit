import AggregateRoot from 'application/domain/model/entities/AggregateRoot';

/**
 * Interface for repositories that allow to create and update entities.
 *
 * @export
 * @interface WritableRepository
 * @template T
 * @template TID
 */
export default interface WritableRepository<T extends AggregateRoot<TID>, TID> {
    save(entity: T): Promise<T>;
}
