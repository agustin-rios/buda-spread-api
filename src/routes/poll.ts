import { Router } from 'express';

import { getUpdateAlertByMarketId, getUpdateAlertOnAllMarket } from './../controller/poll';

const router = Router();

// get marketList
router.get('/:marketId', getUpdateAlertByMarketId );
router.get('/', getUpdateAlertOnAllMarket );

module.exports = router;