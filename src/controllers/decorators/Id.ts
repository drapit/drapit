import Property from "./Property";

const Id = Property({
  type: 'integer', 
  format: 'int64',
  example:  Math.floor(Math.random() * 1000),
  description: 'Integer that is the unique identifier for the object.'
});

export default Id;
