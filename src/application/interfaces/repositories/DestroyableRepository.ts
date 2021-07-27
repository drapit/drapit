import AggregateRoot from 'application/domain/model/entities/AggregateRoot';

export default interface DestroyableRepository<T extends AggregateRoot<TID>, TID> {
    delete(entity: T): Promise<void>;
}
