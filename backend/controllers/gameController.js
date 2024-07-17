import Game from '../models/Game.js';
import { fetchFromIGDB } from '../services/igdb.js';

// Spiele von der API importieren
export const importGames = async (req, res) => {
  try {
    const data = await fetchFromIGDB('games', 'fields name; limit 3;');
    const games = data.map((game) => ({
      id: game.id,
      name: game.name,
    }));

    //! Speichere die Spiele in der MongoDB-Datenbank
    console.log(`Following games imported: ${JSON.stringify(games, null, 2)}`);
    await Game.insertMany(games);
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).send('Error fetching games');
  }
};

// Create
export const createGame = async (req, res) => {
  const game = new Game(req.body);
  try {
    await game.save();
    res.status(201).send(game);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Read
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find({});
    res.send(games);
  } catch (e) {
    res.status(500).send(e);
  }
};

// Update
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      return res.status(404).send('Game not found');
    }
    res.send(game);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Delete
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).send('Game not found');
    }
    res.send(game);
  } catch (e) {
    res.status(500).send(e);
  }
};
