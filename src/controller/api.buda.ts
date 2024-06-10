import { NextFunction, Request, Response } from 'express';

import { getMarkets } from "../api/buda";

const getMarketsFromBuda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getMarkets({
      params: {}
    })
    res.status(200).json( result );
  } catch ( error ) {
    next( error );
  }
}

module.exports = {
  getMarketsFromBuda,
};