import Property from "./Property";

const Seconds = Property({
  type: "number",
  format: "float",
  example: 1628452955,
  description: "Seconds.",
});

export default Seconds;
