import ValueObject from 'application/domain/model/value-objects/ValueObject';

export default class Entity<TID> extends ValueObject {
    public constructor(public readonly id: TID) {
        super();
     }

    public isSame(entity: Entity<TID>): boolean {
        return this.id === entity.id;
    }
}
