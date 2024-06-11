import { Router } from 'express';

import { getMarketsFromBuda, getMarketByIdFromBuda, getMarketOrderBookFromBuda, getMarketSpread, getAllMarketSpreads } from './../controller/api.buda';

const router = Router();

// get marketList
router.get('/', getMarketsFromBuda );
router.get('/spreads', getAllMarketSpreads );
router.get('/:marketId', getMarketByIdFromBuda );
router.get('/:marketId/order_book', getMarketOrderBookFromBuda );
router.get('/:marketId/spread', getMarketSpread );

module.exports = router;