import AggregateRoot from 'application/domain/model/entities/AggregateRoot';

export default interface WritableRepository<T extends AggregateRoot<TID>, TID> {
    save(entity: T): Promise<T>;
}
