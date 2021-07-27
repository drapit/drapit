import AggregateRoot from 'application/domain/model/entities/AggregateRoot';

export default interface ReadableRepository<T extends AggregateRoot<TID>, TID> {
    getById(id: TID): Promise<T>;
}
