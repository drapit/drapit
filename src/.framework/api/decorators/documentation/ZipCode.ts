import Property from "./Property";

const ZipCode = Property({
  type: "integer",
  format: "int32",
  example: "60452",
  description: "Zip code."
});

export default ZipCode;
