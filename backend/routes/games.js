import express from 'express';
import {
  importGames,
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
} from '../controllers/gameController.js';

const router = express.Router();

// Abrufen und Speichern von Games
router.post('/', importGames);

// Abrufen aller Spiele
router.get('/', getAllGames);

// Erstellen eines neuen Spiels
router.post('/create', createGame);

// Aktualisieren eines Spiels
router.put('/:id', updateGame);

// Löschen eines Spiels
router.delete('/:id', deleteGame);

export default router;