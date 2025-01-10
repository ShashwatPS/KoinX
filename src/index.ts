import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import fetchCryptoData from './services/fetchCryptoData';  
import cryptoRoutes from './routes/cryptoRoutes';
import connectDB from './db/connect';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api', cryptoRoutes);

cron.schedule('0 */2 * * *', fetchCryptoData);  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});