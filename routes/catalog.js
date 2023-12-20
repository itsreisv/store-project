const express = require("express");
const router = express.Router();

// Require controller modules.
const game_controller = require("../controllers/gameController");
const genre_controller = require("../controllers/genreController");
const game_instance_controller = require("../controllers/gameinstanceController");

/// game ROUTES ///

// GET catalog home page.
router.get("/", game_controller.index);

// GET request for creating a game. NOTE This must come before routes that display game (uses id).
router.get("/game/create", game_controller.game_create_get);

// POST request for creating game.
router.post("/game/create", game_controller.game_create_post);

// GET request to delete game.
router.get("/game/:id/delete", game_controller.game_delete_get);

// POST request to delete game.
router.post("/game/:id/delete", game_controller.game_delete_post);

// GET request to update game.
router.get("/game/:id/update", game_controller.game_update_get);

// POST request to update game.
router.post("/game/:id/update", game_controller.game_update_post);

// GET request for one game.
router.get("/game/:id", game_controller.game_detail);

// GET request for list of all game items.
router.get("/games", game_controller.game_list);


/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

/// gameinstance ROUTES ///

// GET request for creating a gameinstance. NOTE This must come before route that displays gameinstance (uses id).
router.get(
  "/gameinstance/create",
  game_instance_controller.gameinstance_create_get,
);

// POST request for creating gameinstance.
router.post(
  "/gameinstance/create",
  game_instance_controller.gameinstance_create_post,
);

// GET request to delete gameinstance.
router.get(
  "/gameinstance/:id/delete",
  game_instance_controller.gameinstance_delete_get,
);

// POST request to delete gameinstance.
router.post(
  "/gameinstance/:id/delete",
  game_instance_controller.gameinstance_delete_post,
);

// GET request to update gameinstance.
router.get(
  "/gameinstance/:id/update",
  game_instance_controller.gameinstance_update_get,
);

// POST request to update gameinstance.
router.post(
  "/gameinstance/:id/update",
  game_instance_controller.gameinstance_update_post,
);

// GET request for one gameinstance.
router.get("/gameinstance/:id", game_instance_controller.gameinstance_detail);

// GET request for list of all gameinstance.
router.get("/gameinstances", game_instance_controller.gameinstance_list);

module.exports = router;
