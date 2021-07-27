import AggregateRoot from 'application/domain/model/entities/AggregateRoot';
import DestroyableRepository from './DestroyableRepository';
import ReadableRepository from './ReadableRepository';
import WritableRepository from './WritableRepository';

export default interface Repository<T extends AggregateRoot<TID>, TID> 
    extends ReadableRepository<T, TID>, 
            WritableRepository<T, TID>, 
            DestroyableRepository<T, TID> {
}
