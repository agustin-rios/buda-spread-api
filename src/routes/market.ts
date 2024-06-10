import { Router } from 'express';

const { getMarketsFromBuda, getMarketByIdFromBuda, getMarketOrderBookFromBuda } = require('./../controller/api.buda');

const router = Router();

// get marketList
router.get('/', getMarketsFromBuda );
router.get('/:marketId', getMarketByIdFromBuda );
router.get('/:marketId/order_book', getMarketOrderBookFromBuda );

module.exports = router;