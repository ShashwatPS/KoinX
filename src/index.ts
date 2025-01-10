import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import fetchCryptoData from './services/fetchCryptoData';  
import cryptoRoutes from './routes/cryptoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', cryptoRoutes);

app.get('/', async (req: Request, res: Response) => {
    await fetchCryptoData();
    res.send('Hello World!');
});

cron.schedule('0 */2 * * *', fetchCryptoData);  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});