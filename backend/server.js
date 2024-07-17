import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import checkAccessToken from './middleware/checkAccessToken.js';
import routes from './routes/index.js';

dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(checkAccessToken);
app.use('/', routes);

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
