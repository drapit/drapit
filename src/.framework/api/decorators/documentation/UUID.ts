import Property from "./Property";

const UUID = Property({
  type: "string",
  example: "d2b07eea-f2c2-4cfb-b208-9bfcd0bc22ea",
  description: "A universally unique identifier.",
});

export default UUID;
