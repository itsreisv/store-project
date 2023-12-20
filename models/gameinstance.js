const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true},
  status: {
    type: String,
    required: true,
    enum: ["Availible", "Unavailible"],
    default: "Availible",
  }
});

GameInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`
});

module.exports = mongoose.model('GameInstance', GameInstanceSchema);