import { Express } from 'express';

const budaMarketsRoute = require('./market');
const alertRoute = require('./alert');

const applyRoutes = (app: Express, dir: string = '') => {
    app.use(`${dir}/buda/markets`, budaMarketsRoute);
    app.use(`${dir}/alert`, alertRoute);
};

module.exports = applyRoutes;