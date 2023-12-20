const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30},
  description: { type: String, required: true},
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
});

GameSchema.virtual("url").get(function () {
  return `/catalog/game/${this._id}`
});

module.exports = mongoose.model("Game", GameSchema);