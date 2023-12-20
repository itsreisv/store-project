const gameInstance = require('../models/gameinstance');
const asyncHandler = require('express-async-handler');

// Display list of all BookInstances.
exports.gameinstance_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance list");
});

// Display detail page for a specific BookInstance.
exports.gameinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: GameInstance detail: ${req.params.id}`);
});

// Display BookInstance create form on GET.
exports.gameinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance create GET");
});

// Handle BookInstance create on POST.
exports.gameinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance create POST");
});

// Display BookInstance delete form on GET.
exports.gameinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.gameinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance delete POST");
});

// Display BookInstance update form on GET.
exports.gameinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance update GET");
});

// Handle bookinstance update on POST.
exports.gameinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance update POST");
});