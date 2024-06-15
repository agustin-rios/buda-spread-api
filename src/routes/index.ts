import { Express } from 'express';

const budaMarketsRoute = require('./market');
const alertRoute = require('./alert');
const pollRoute = require('./poll');

const applyRoutes = (app: Express, dir: string = '') => {
    app.use(`${dir}/buda/markets`, budaMarketsRoute);
    app.use(`${dir}/alert`, alertRoute);
    app.use(`${dir}/poll`, pollRoute);
};

module.exports = applyRoutes;