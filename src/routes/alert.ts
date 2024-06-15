import { Router } from 'express';

import { postSpreadAlert, getSpreadAlerts } from './../controller/alert';

const router = Router();

// get marketList
router.post('/spread', postSpreadAlert );
router.get('/spread', getSpreadAlerts );

module.exports = router;