import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes';
import confirmRoutes from './routes/confirmRoutes';
import connectDB from './models/database';

console.log('Antes de carregar .env');
dotenv.config();
console.log('Depois de carregar .env');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api', uploadRoutes);
app.use('/api', confirmRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
