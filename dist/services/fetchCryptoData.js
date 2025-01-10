"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cryptoModel_1 = __importDefault(require("../models/cryptoModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("../db/connect"));
dotenv_1.default.config();
const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const API_URL = process.env.API_KEY;
const fetchCryptoData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)();
        const response = yield axios_1.default.get(API_URL, {
            params: {
                ids: COINS.join(','),
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true',
            },
        });
        for (const coin of COINS) {
            const { usd, usd_market_cap, usd_24h_change } = response.data[coin];
            const newCrypto = new cryptoModel_1.default({
                coinId: coin,
                name: coin.charAt(0).toUpperCase() + coin.slice(1),
                currentPriceUSD: usd,
                marketCapUSD: usd_market_cap,
                change24h: usd_24h_change,
            });
            yield newCrypto.save();
        }
    }
    catch (error) {
        console.error('Error fetching crypto data:', error);
    }
});
exports.default = fetchCryptoData;
