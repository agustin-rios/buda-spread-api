import { NextFunction, Request, Response } from 'express';

import { getMarkets, getMarketById, getMarketOrderBook } from "../api/buda";

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

module.exports = {
  getMarketsFromBuda,
  getMarketByIdFromBuda,
  getMarketOrderBookFromBuda,
};