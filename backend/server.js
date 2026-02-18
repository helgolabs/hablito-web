import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();

// Database
sequelize.sync()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Unable to connect to the database:', err));

// CORS - allow frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://hablito.com',
  'https://www.hablito.com',
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import verbRoutes from './routes/verbRoutes.js';
import tenseRoutes from './routes/tenseRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

app.use('/api', verbRoutes);
app.use('/api', tenseRoutes);
app.use('/api', settingRoutes);

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hablito API' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
