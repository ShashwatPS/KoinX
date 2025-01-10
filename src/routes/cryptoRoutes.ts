import express, { Request, Response } from 'express';
import CryptoModel from '../models/cryptoModel';

const router = express.Router();

router.get('/stats', async (req: Request, res: Response): Promise<any> => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin as string)) {
    return res.status(400).json({ error: 'Pass a valid coin parameter' });
  }

  try {
    const crypto = await CryptoModel.findOne({ coinId: coin as string }).sort({ createdAt: -1 });

    if (!crypto) {
      return res.status(404).json({ error: 'Cryptocurrency not found' });
    }

    res.json({
      price: crypto.currentPriceUSD,
      marketCap: crypto.marketCapUSD,
      "24hChange": crypto.change24h,
    });

  } catch (error) {

    console.error('Error fetching crypto stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
});

export default router;