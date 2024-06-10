import axios, { type Method } from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { paths } from './schema';

// Request shape
type GetMarketsRequest = paths['/markets']['get']['parameters'];
type GetMarketByIdRequest = paths['/markets/{marketId}']['get']['parameters'];
type GetMarketOrderBookRequest = paths['markets/{marketId}/order_book']['get']['parameters'];

// Response shape
type GetMarketsResponse = paths['/markets']['get']['responses']['200']['content']['application/json'];
type GetMarketByIdResponse = paths['/markets/{marketId}']['get']['responses']['200']['content']['application/json'];
type GetMarketOrderBookResponse = paths['markets/{marketId}/order_book']['get']['responses']['200']['content']['application/json'];

// API client
const budaApiUrl = process.env.BUDA_API_URL;
if (!budaApiUrl) throw new Error('Environment variable BUDA_API_URL is required.');
const budaAPIClient = axios.create({
    baseURL: budaApiUrl
});

// API definitions

export const getMarkets = ({ params } : { params: GetMarketsRequest }) => budaAPIClient.request<GetMarketsResponse>({
    method: 'GET' as Method,
    url: '/markets'
});

export const getMarketById = ({ params } : { params: GetMarketByIdRequest }) => budaAPIClient.request<GetMarketByIdResponse>({
    method: 'GET' as Method,
    url: `/markets/${params.path.marketId}`,
});

export const getMarketOrderBook = ({ params } : { params: GetMarketOrderBookRequest }) => budaAPIClient.request<GetMarketOrderBookResponse>({
    method: 'GET' as Method,
    url: `/markets/${params.path.marketId}/order_book`,
});