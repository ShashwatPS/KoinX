import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import fetchCryptoData from './services/fetchCryptoData';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    await fetchCryptoData();
    res.send('Hello World!');
});

cron.schedule('0 */2 * * *', fetchCryptoData);  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});