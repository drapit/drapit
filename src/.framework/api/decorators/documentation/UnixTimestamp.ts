import Property from "./Property";

const UnixTimestamp = Property({
  type: "integer",
  format: "int64",
  example: 1628452955,
  description: "Unix timestamp.",
});

export default UnixTimestamp;
