import Property from "./Property";

const Age = Property({
  type: "integer",
  format: "int32",
  example: 18,
  description: "Person's age."
});

export default Age;
