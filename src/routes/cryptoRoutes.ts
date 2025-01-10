import express, { Request, Response } from 'express';
import CryptoModel from '../models/cryptoModel';
import calculateStandardDeviation from '../utils/standardDeviation';

const router = express.Router();

router.get('/stats', async (req: Request, res: Response): Promise<any> => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin as string)) {
    return res.status(400).json({ error: 'Invalid coin parameter. Choose from bitcoin, matic-network, ethereum.'});
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

  
router.get('/deviation', async (req: Request, res: Response): Promise<any> => {
    const { coin } = req.query;  
  
    if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin as string)) {
      return res.status(400).json({ error: 'Invalid coin parameter. Choose from bitcoin, matic-network, ethereum.' });
    }
  
    try {
      const cryptoRecords = await CryptoModel.find({ coinId: coin }).sort({ lastUpdated: -1 }).limit(100);
  
      if (cryptoRecords.length === 0) {
        return res.status(404).json({ error: 'No records found for this cryptocurrency.' });
      }
  
      const prices = cryptoRecords.map(record => record.currentPriceUSD);
      const deviation = calculateStandardDeviation(prices);
  
      res.json({ deviation: deviation.toFixed(2) });

    } catch (error) {

      console.error('Error calculating price deviation:', error);
      res.status(500).json({ error: 'Internal Server Error' });

    }
  });
  
  

export default router;