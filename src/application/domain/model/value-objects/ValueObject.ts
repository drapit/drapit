import { shallowEqual } from 'shallow-equal-object';

export default class ValueObject {
    // TODO: confirm this works as expected.
    public equals(entity: ValueObject): boolean {
        if (entity == null) return false;

        return shallowEqual(this, entity)
    }
}
