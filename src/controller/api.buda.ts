import { NextFunction, Request, Response } from 'express';

import { getMarkets, getMarketById, getMarketOrderBook } from "../api/buda";
import { calculateSpread } from "../util/order_book";

const getMarketsFromBuda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await getMarkets({ params: {} });
    const { markets } = data;    
    res.status(200).json( markets );
  } catch ( error ) {
    next( error );
  }
}

const getMarketByIdFromBuda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { marketId } = req.params;
    const { data } = await getMarketById({ params: { path: { marketId }} });
    const { market } = data;
    res.status(200).json( market );
  } catch ( error ) {
    next( error );
  }
}

const getMarketOrderBookFromBuda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { marketId } = req.params;
    const { data } = await getMarketOrderBook({ params: { path: { marketId }} });
    const { order_book } = data;
    res.status(200).json( order_book );
  } catch ( error ) {
    next( error );
  }
}

const getMarketSpread = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { marketId } = req.params;
    const { data } = await getMarketOrderBook({ params: { path: { marketId }} });
    const { order_book } = data;
    const spread = calculateSpread(marketId, order_book);
    res.status(200).json( spread );
  } catch ( error ) {
    next( error );
  }
}

const getAllMarketSpreads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await getMarkets({ params: {} });
    const { markets } = data;
    const spreads = await Promise.all(
      markets.map( async (market: any) => {
        const { data } = await getMarketOrderBook({ params: { path: { marketId: market.id }} });
        const { order_book } = data;
        return calculateSpread(market.id, order_book);
      })
    );
    res.status(200).json( spreads );
  } catch ( error ) {
    next( error );
  }
}

module.exports = {
  getMarketsFromBuda,
  getMarketByIdFromBuda,
  getMarketOrderBookFromBuda,
  getMarketSpread,
  getAllMarketSpreads
};