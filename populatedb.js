#! /usr/bin/env node

const userArgs = process.argv.slice(2);

const Game = require('./models/game');
const Genre = require('./models/genre');
const GameInstance = require('./models/gameinstance');

const genres = [];
const games = [];
const gameinstances = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect("mongodb+srv://admin2:H0dYOE63ARc40uOx@cluster0.m8t8sba.mongodb.net/store_project?retryWrites=true&w=majority");
  console.log('Debug: should be connected');
  await createGenres();
  await createGames();
  await createGameInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function gameCreate(index, name, description, genre) {
  const gamedetail = {
    name: name,
    description: description,
  };
  if (genre != false) gamedetail.genre = genre;

  const game = new Game(gamedetail);
  await game.save();
  games[index] = game;
  console.log(`Added book: ${name}`);
}

async function gameInstanceCreate(index, game, status) {
  const gameinstancedetail = {
    game: game,
  }
  if (status != false) gameinstancedetail.status = status;

  const gameinstance = new GameInstance(gameinstancedetail);
  await gameinstance.save();
  gameinstances[index] = gameinstance;
}

async function createGenres() {
  console.log('Adding genres');
  await Promise.all([
    genreCreate(0, 'RPG'),
    genreCreate(1, 'FPS'),
    genreCreate(2, 'RTS')
  ])
}

async function createGames() {
  console.log('Adding games');
  await Promise.all([
    gameCreate(0, "Dark Souls",
     "Venture into the dark, lest the light beget you",
     [genres[0]]),
     gameCreate(1, "Baldurs Gate",
     "The mindflayers have returned",
     [genres[0]]),
     gameCreate(2, "Call of Duty",
     "Makarov has been betrayed, but by who?",
     [genres[1]]),
     gameCreate(3, "Counter Strike",
     "Competitive FPS",
     [genres[1]]),
     gameCreate(4, "Starcraft",
     "Command the battlefield",
     [genres[2]]),
     gameCreate(5, "Age of Empires",
     "Command the strongest empire",
     [genres[2]]),
  ])
}

async function createGameInstances() {
  await Promise.all([
    gameInstanceCreate(0, games[0], "Availible"),
    gameInstanceCreate(1, games[1], "Availible"),
    gameInstanceCreate(2, games[2], "Availible"),
    gameInstanceCreate(3, games[3], "Availible"),
    gameInstanceCreate(4, games[4], "Availible"),
    gameInstanceCreate(5, games[5], "Availible"),
  ])
}