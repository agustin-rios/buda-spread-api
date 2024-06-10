import axios, { type Method } from 'axios';
import { paths } from '../schema';

// Request shape
type GetMarketsRequest = paths['/markets']['get']['parameters']
type GetMarketByIdRequest = paths['/markets/{marketId}']['get']['parameters']

// Response shape
type GetMarketsResponse = paths['/markets']['get']['responses']['200']['content']['application/json']
type GetMarketByIdResponse = paths['/markets/{marketId}']['get']['responses']['200']['content']['application/json']

// API client
const budaApiUrl = process.env.BUDA_API_URL;
if (!budaApiUrl) throw new Error('Environment variable BUDA_API_URL is required.');
const budaAPIClient = axios.create({
    baseURL: budaApiUrl
})

// API definitions

export const getMarkets = ({ params } : { params: GetMarketsRequest }) => budaAPIClient.request<GetMarketsResponse>({
    method: 'GET' as Method,
})

export const getMarketById = ({ params } : { params: GetMarketByIdRequest }) => budaAPIClient.request<GetMarketByIdResponse>({
    method: 'GET' as Method,
    url: `${params.path.marketId}/`,
})