import { paths } from '../api/schema';
type MarketOrderBook = paths['markets/{marketId}/order_book']['get']['responses']['200']['content']['application/json'];
type OrderBook = MarketOrderBook['order_book'];
type SpreadResponse = {
    marketId: string;
    spread?: number;
    error?: string;
};


export const calculateSpread = (marketId: string, order_book: OrderBook): SpreadResponse => {
    if (!order_book.asks || order_book.asks.length === 0 || !order_book.bids || order_book.bids.length === 0) {
      return { marketId, error: 'Market does not have asks or bids' };
    }
  
    const askPrice = parseFloat(order_book.asks[0][0]); // supposing the first element is the best price
    const bidPrice = parseFloat(order_book.bids[0][0]); // supposing the first element is the best price
    const spread = askPrice - bidPrice;
  
    return {
      marketId,
      spread,
    };
  };