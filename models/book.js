const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  authors: { type: [String], required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  mtnBikeProjectId: { type: String, required: true, unique: true }
});

const Trail = mongoose.model("Trail", trailSchema);

module.exports = Trail;
