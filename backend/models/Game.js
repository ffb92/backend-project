import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const Game = mongoose.model('Game', gameSchema);

export default Game;