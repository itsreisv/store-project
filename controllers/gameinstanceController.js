const GameInstance = require('../models/gameinstance');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator')

// Display list of all BookInstances.
exports.gameinstance_list = asyncHandler(async (req, res, next) => {
  const allGameInstances = await GameInstance.find().populate("game").exec()

  res.render("gameinstance_list", {
    title: "Game Instance List",
    gameinstance_list: allGameInstances,
  })
});

// Display detail page for a specific BookInstance.
exports.gameinstance_detail = asyncHandler(async (req, res, next) => {
  const gameInstance = await GameInstance.findById(req.params.id)
  .populate('game')
  .exec();

  if (gameInstance === null) {
    const err = new Error('Game copy not found')
    err.status= 404
    return next(err)
  }

  res.render('gameinstance_detail', {
    title: "Game:",
    gameinstance: gameInstance,
  })
});

// Display BookInstance create form on GET.
exports.gameinstance_create_get = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find({}, "title").sort({title:1}).exec();

  res.render("gameinstance_form", {
    title:  "Create GameInstance",
    game_list: allGames
  })
});

// Handle BookInstance create on POST.
exports.gameinstance_create_post = [
  body("game", "Game must be specified")
    .trim()
    .isLength({min:1})
    .escape(),
  body("status").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const gameInstance = new GameInstance({
      game: req.body.game,
      status: req.body.status,
    });
    if (!errors.isEmpty()) {
      const allGames = await Game.find({}, "title").sort({ title: 1}).exec();

      res.render("gameinstance_form", {
        title: "Create GameInstance",
        game_list: allGames,
        selected_game: gameInstance.game._id,
        errors: errors.array(),
        gameInstance: gameInstance
      });
      return;
    } else {
      await gameInstance.save();
      res.redirect(gameInstance.url)
    }
  }),
]

// Display BookInstance delete form on GET.
exports.gameinstance_delete_get = asyncHandler(async (req, res, next) => {
  const gameInstance = await GameInstance.findById(req.params.id)
    .populate('game')
    .exec()

  if (bookInstance === null) {
    res.redirect('/catalog/gameinstances')
  }

  res.render('gameinstance_delete', {
    title: "Delete GameInstance",
    gameinstance: gameInstance
  })
});

// Handle BookInstance delete on POST.
exports.gameinstance_delete_post = asyncHandler(async (req, res, next) => {
  await GameInstance.findByIdAndDelete(req.body.id);
  res.redirect('/catalog/gameinstances')
});

// Display BookInstance update form on GET.
exports.gameinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance update GET");
});

// Handle bookinstance update on POST.
exports.gameinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GameInstance update POST");
});