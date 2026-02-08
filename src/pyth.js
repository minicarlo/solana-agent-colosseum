import { Connection, PublicKey } from '@solana/web3.js';
import { PythHttpClient, getPythProgramKeyForCluster } from '@pythnetwork/client';

const PYTH_PRICE_FEEDS = {
  'SOL/USD': new PublicKey('H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712j4tJ8xm'),
  'BTC/USD': new PublicKey('GVXRSBjFk6e6J3NbVPXohRJauUXq8aP7i9P2rpZUGpyL'),
  'ETH/USD': new PublicKey('JBu1AL4obLsCMwKcNEfB84fxQUaX6w1kFUx6EQJQ5Xc'),
  'JUP/USD': new PublicKey('7tb3UvHiiHGqgw2tErTeEW56N8Yt4w8mQe9Rbf3Y1NU'),
  'USDC/USD': new PublicKey('Gnt27xtC473ZT2Mw5u8wZ68Z3gUESjMWEjZ6k6uC2pH'),
};

export class PythPriceFeed {
  constructor(connection) {
    this.connection = connection;
    this.pythClient = new PythHttpClient(
      connection,
      getPythProgramKeyForCluster('devnet')
    );
  }

  async getPrice(priceFeedKey) {
    try {
      const data = await this.pythClient.getData();
      const priceAccount = data.productPrice.get(priceFeedKey.toBase58());
      
      if (!priceAccount) {
        return null;
      }

      return {
        price: priceAccount.price,
        confidence: priceAccount.confidence,
        timestamp: new Date().toISOString(),
        status: priceAccount.status
      };
    } catch (error) {
      console.error('Pyth price fetch error:', error);
      return null;
    }
  }

  async getAllPrices() {
    const prices = {};
    
    for (const [pair, key] of Object.entries(PYTH_PRICE_FEEDS)) {
      prices[pair] = await this.getPrice(key);
    }
    
    return prices;
  }

  async getPriceForPair(pair) {
    const key = PYTH_PRICE_FEEDS[pair];
    if (!key) {
      throw new Error(`Price feed not found for ${pair}`);
    }
    return this.getPrice(key);
  }
}

export { PYTH_PRICE_FEEDS };
