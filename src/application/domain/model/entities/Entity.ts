import ValueObject from 'application/domain/model/value-objects/ValueObject';

/**
 * Base class for entities.
 *
 * @export
 * @class Entity
 * @extends {ValueObject}
 * @template TID
 */
export default class Entity<TID> extends ValueObject {
    /**
     * Creates an instance of Entity.
     * @param {TID} id
     * @memberof Entity
     */
    public constructor(public readonly id: TID) {
        super();
     }

    /**
     * Checks if two entities are the same.
     *
     * @param {Entity<TID>} entity
     * @return {*}  {boolean}
     * @memberof Entity
     */
    public isSame(entity: Entity<TID>): boolean {
        return this.id === entity.id;
    }
}
