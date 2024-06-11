import { Express } from 'express';

const budaMarketsRoute = require('./market');

const applyRoutes = (app: Express, dir: string = '') => {
    app.use(`${dir}/buda/markets`, budaMarketsRoute);
};

module.exports = applyRoutes;