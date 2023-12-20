const Game = require("../models/game");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all books.
exports.game_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game list");
});

// Display detail page for a specific book.
exports.game_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Game detail: ${req.params.id}`);
});

// Display book create form on GET.
exports.game_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game create GET");
});

// Handle book create on POST.
exports.game_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game create POST");
});

// Display book delete form on GET.
exports.game_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game delete GET");
});

// Handle book delete on POST.
exports.game_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game delete POST");
});

// Display book update form on GET.
exports.game_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game update GET");
});

// Handle book update on POST.
exports.game_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game update POST");
});