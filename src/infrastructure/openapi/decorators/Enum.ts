import Property from "./Property";

/**
 * Check whether a value is non numeric,
 * meaning the values of the keys are string.
 * 
 * It happens that when values are not strings
 * the Object.values() and Object.keys() methods
 * will return twice as many items then they do when
 * the values are strings.
 *
 * @template T
 * @param {T} enumerator
 * @return {*}  {boolean}
 */
const isNonNumeric = <T>(enumerator: T): boolean =>
  Object.values(enumerator).length ===
  Object.values(enumerator).filter((value) => isNaN(Number(value))).length;

/**
 * Documents a range of valid values for a property.
 *
 * @template T
 * @param {T} enumerator
 * @return {*}  {PropertyDecorator}
 */
const Enum = <T>(enumerator: T): PropertyDecorator => {
  let values = Object.values(enumerator).filter((value) =>
    !isNaN(Number(value))
  );

  if (isNonNumeric(enumerator)) {
    values = Object.values(enumerator).filter((value) => isNaN(Number(value)));
  }

  return Property({
    enum: values,
    example: values[0],
  })();
};

export default Enum;
