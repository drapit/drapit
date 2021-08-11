import Entity from './Entity';

/**
 * Base class for aggregate roots.
 * SEE: https://martinfowler.com/bliki/DDD_Aggregate.html
 *
 * @export
 * @class AggregateRoot
 * @extends {Entity<TID>}
 * @template TID
 */
export default class AggregateRoot<TID> extends Entity<TID> {

}
