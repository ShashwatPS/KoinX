import axios from 'axios';    
import CryptoModel from '../models/cryptoModel';  
import dotenv from 'dotenv';

dotenv.config();

const COINS = ['bitcoin', 'matic-network', 'ethereum'];  
const API_URL = process.env.API_KEY as string;

const fetchCryptoData = async (): Promise<void> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: COINS.join(','), 
        vs_currencies: 'usd', 
        include_market_cap: 'true',  
        include_24hr_change: 'true', 
      },
    });

    for (const coin of COINS) {
      const { usd, usd_market_cap, usd_24h_change } = response.data[coin];
      const newCrypto = new CryptoModel({
        coinId: coin,
        name: coin.charAt(0).toUpperCase() + coin.slice(1), 
        currentPriceUSD: usd,
        marketCapUSD: usd_market_cap,
        change24h: usd_24h_change,
      });

      await newCrypto.save();

    }
  } catch (error) {
    console.error('Error fetching crypto data:', error);  
  }
};

export default fetchCryptoData;
