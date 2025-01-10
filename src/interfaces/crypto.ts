import { Document } from 'mongoose';

export interface ICrypto extends Document {
    coinId: string;
    name: string;
    currentPriceUSD: number;
    marketCapUSD: number;
    change24h: number;
    lastUpdated: Date;
}