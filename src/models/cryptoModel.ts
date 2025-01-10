import mongoose, { Schema } from 'mongoose';
import { ICrypto } from '../interfaces/crypto';

const CryptoSchema: Schema = new Schema(
    {
      coinId: { type: String, required: true },
      name: { type: String, required: true },
      currentPriceUSD: { type: Number, required: true },
      marketCapUSD: { type: Number, required: true },
      change24h: { type: Number, required: true },
    },
    {
      timestamps: true, 
    }
  );

const CryptoModel = mongoose.model<ICrypto>('Crypto', CryptoSchema);

export default CryptoModel;
