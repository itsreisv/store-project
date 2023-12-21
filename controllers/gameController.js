const Game = require("../models/game");
const GameInstance = require('../models/gameinstance')
const Genre = require('../models/genre')
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numGames,
    numGamesInstances,
    numGenres,
  ] = await Promise.all([
    Game.countDocuments({}).exec(),
    GameInstance.countDocuments({}).exec(),
    GameInstance.countDocuments({ status: "Availible" }).exec(),
    Genre.countDocuments({}).exec(),
  ])

  res.render('index', {
    title: "Video Game Store Home",
    game_count: numGames,
    game_instance_count: numGamesInstances,
    genre_count: numGenres,
  })
});

// Display list of all books.
exports.game_list = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find({}, "genre name")
    .sort({title: 1})
    .populate("genre")
    .exec()

  res.render("game_list", {title: "Game List", game_list: allGames})
});

// Display detail page for a specific book.
exports.game_detail = asyncHandler(async (req, res, next) => {
  const [game, gameInstances] = await Promise.all([
    Game.findById(req.params.id).populate('genre').exec(),
    GameInstance.find({ game: req.params.id }).exec()
  ])
  if (game === null) {
    const err = new Error("Game not found")
    err.status = 404
    return next(err)
  }

  res.render('game_detail', {
    title: game.name,
    game: game,
    game_instances: gameInstances,
  })
});

// Display book create form on GET.
exports.game_create_get = asyncHandler(async (req, res, next) => {
  const allGenres = await Promise.all([
    Genre.find().sort({ name: 1 }).exec(),
  ])
  res.render('game_form', {
    title: "Create Game",
    genres: allGenres,
  })
});

// Handle book create on POST.
exports.game_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre]
    }
    next()
  },
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', "Must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('genre.*').escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const game = new Game({
      name: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
    })

    if (!errors.isEmpty()) {
      const allGenres = await Promise.all([
        Genre.find().sort({name:1}).exec()
      ]);

      for (const genre of allGenres) {
        if (game.genre.includes(genre._id)) {
          genre.checked = "true"
        }
      }
      res.render('game_form', {
        title: "Create Game",
        genres: allGenres,
        game: game,
        errors: errors.array(),
      });
    } else {
      await game.save();
      res.redirect(game.url)
    }
  })
];

// Display book delete form on GET.
exports.game_delete_get = asyncHandler(async (req, res, next) => {
  const [game, gameInstances] = await Promise.all([
    Game.findById(req.params.id).populate('genre').exec(),
    GameInstance.find({ game: req.params.id }).exec()
  ])

  if(game === null) {
    res.redirect('/catalog/games')
  }

  res.render('game_delete', {
    title: "Delete Game",
    game: game,
    game_instances: gameInstances
  })
});

// Handle book delete on POST.
exports.game_delete_post = asyncHandler(async (req, res, next) => {
  const [game, gameInstances] = await Promise.all([
    Game.findById(req.params.id).populate('genre').exec(),
    GameInstance.find({book:req.params.id}).exec()
  ])

  if(game === null) {
    res.redirect('/catalog/games')
  }

  if(gameInstances.length > 0) {
    res.render('game_delete', {
      title: "Delete Game",
      game: game,
      game_instances: gameInstances
    })
    return;
  } else {
    await Game.findByIdAndDelete(req.body.id)
    res.redirect('/catalog/games')
  }
});

// Display book update form on GET.
exports.game_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game update GET");
});

// Handle book update on POST.
exports.game_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Game update POST");
});