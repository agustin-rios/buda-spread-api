import { Router } from 'express';

const { 
    postSpreadAlert,
    getSpreadAlerts
} = require('./../controller/alert');

const router = Router();

// get marketList
router.post('/spread', postSpreadAlert );
router.get('/spread', getSpreadAlerts );

module.exports = router;