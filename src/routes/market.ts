import { Router } from 'express';

const { getMarketsFromBuda, getMarketByIdFromBuda } = require('./../controller/api.buda');

const router = Router();

// get marketList
router.get('/:marketId', getMarketByIdFromBuda );
router.get('/', getMarketsFromBuda );

module.exports = router;