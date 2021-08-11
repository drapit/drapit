import AggregateRoot from 'application/domain/model/entities/AggregateRoot';

/**
 * Interface for repositories that allow to get entities by id.
 *
 * @export
 * @interface ReadableRepository
 * @template T
 * @template TID
 */
export default interface ReadableRepository<T extends AggregateRoot<TID>, TID> {
    getById(id: TID): Promise<T>;
}
