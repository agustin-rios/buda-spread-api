import { Router } from 'express';

const { getMarketsFromBuda } = require('./../controller/api.buda');

const router = Router();

// get marketList
router.get('/', getMarketsFromBuda );

module.exports = router;