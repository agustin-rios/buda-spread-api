import { Request, Response, NextFunction } from 'express';
import { getMarketOrderBook } from '../../src/api/buda';
import { calculateSpread, SpreadResponse } from '../../src/util/order_book';
import { readJsonFile } from '../../src/util/jsonStorage';
import { getUpdateAlertByMarketId } from '../../src/controller/poll';
import { AxiosResponse } from 'axios';

jest.mock('../api/buda');
jest.mock('../util/order_book');
jest.mock('../util/jsonStorage');

describe('getUpdateAlertByMarketId', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 if alert is not found', async () => {
    const marketId = 'BTC-CLP';
    const alerts = [{ marketId: 'ETH-CLP', spread: 0.5 }];
    const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
    readJsonFileMock.mockResolvedValue(alerts);

    req.params = { marketId };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await getUpdateAlertByMarketId(req, res, next);

    expect(readJsonFileMock).toHaveBeenCalledWith('alertSpread.json');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Alert not found' });
  });

  it('should return error message if spread calculation fails', async () => {
    const marketId = 'BTC-CLP';
    const alert = { marketId, spread: 0.5 };
    const alerts = [alert];
    const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
    readJsonFileMock.mockResolvedValue(alerts);

    const getMarketOrderBookMock = getMarketOrderBook as jest.MockedFunction<typeof getMarketOrderBook>;
    getMarketOrderBookMock.mockResolvedValue({ data: { order_book: { asks: [['100', '1']], bids: [['99', '1']] } } } as AxiosResponse<{ order_book: { asks: [string, string][]; bids: [string, string][]; }; }, any>);

    const calculateSpreadMock = calculateSpread as jest.MockedFunction<typeof calculateSpread>;
    calculateSpreadMock.mockReturnValue({ error: 'Spread calculation failed', marketId});

    req.params = { marketId };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await getUpdateAlertByMarketId(req, res, next);

    expect(readJsonFileMock).toHaveBeenCalledWith('alertSpread.json');
    expect(getMarketOrderBookMock).toHaveBeenCalledWith({ params: { path: { marketId } } });
    expect(calculateSpreadMock).toHaveBeenCalledWith(marketId, {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Spread calculation failed', state: false });
  });

  it('should return "Spread is greater than the alert" if spread is greater than alert', async () => {
    const marketId = 'BTC-CLP';
    const alert = { marketId, spread: 0.5 };
    const alerts = [alert];
    const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
    readJsonFileMock.mockResolvedValue(alerts);

    const getMarketOrderBookMock = getMarketOrderBook as jest.MockedFunction<typeof getMarketOrderBook>;
    getMarketOrderBookMock.mockResolvedValue({ data: { order_book: { asks: [['100', '1']], bids: [['99', '1']] } } } as AxiosResponse<{ order_book: { asks: [string, string][]; bids: [string, string][]; }; }, any>);

    const calculateSpreadMock = calculateSpread as jest.MockedFunction<typeof calculateSpread>;
    calculateSpreadMock.mockReturnValue({ marketId, spread: 0.6 });

    req.params = { marketId };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await getUpdateAlertByMarketId(req, res, next);

    expect(readJsonFileMock).toHaveBeenCalledWith('alertSpread.json');
    expect(getMarketOrderBookMock).toHaveBeenCalledWith({ params: { path: { marketId } } });
    expect(calculateSpreadMock).toHaveBeenCalledWith(marketId, {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Spread is greater than the alert', state: true });
  });

  it('should return "Spread is lower than the alert" if spread is lower than alert', async () => {
    const marketId = 'BTC-CLP';
    const alert = { marketId, spread: 0.5 };
    const alerts = [alert];
    const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
    readJsonFileMock.mockResolvedValue(alerts);

    const getMarketOrderBookMock = getMarketOrderBook as jest.MockedFunction<typeof getMarketOrderBook>;
    getMarketOrderBookMock.mockResolvedValue({ data: { order_book: { asks: [['100', '1']], bids: [['99', '1']] } } } as AxiosResponse<{ order_book: { asks: [string, string][]; bids: [string, string][]; }; }, any>);


    const calculateSpreadMock = calculateSpread as jest.MockedFunction<typeof calculateSpread>;
    calculateSpreadMock.mockReturnValue({ marketId, spread: 0.6 });

    req.params = { marketId };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await getUpdateAlertByMarketId(req, res, next);

    expect(readJsonFileMock).toHaveBeenCalledWith('alertSpread.json');
    expect(getMarketOrderBookMock).toHaveBeenCalledWith({ params: { path: { marketId } } });
    expect(calculateSpreadMock).toHaveBeenCalledWith(marketId, {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Spread is lower than the alert', state: true });
  });

  it('should return "Spread is equal to the alert" if spread is equal to alert', async () => {
    const marketId = 'BTC-CLP';
    const alert = { marketId, spread: 0.5 };
    const alerts = [alert];
    const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
    readJsonFileMock.mockResolvedValue(alerts);

    const getMarketOrderBookMock = getMarketOrderBook as jest.MockedFunction<typeof getMarketOrderBook>;
    getMarketOrderBookMock.mockResolvedValue({ data: { order_book: { asks: [['100', '1']], bids: [['99', '1']] } } } as AxiosResponse<{ order_book: { asks: [string, string][]; bids: [string, string][]; }; }, any>);
    
    const calculateSpreadMock = calculateSpread as jest.MockedFunction<typeof calculateSpread>;
    calculateSpreadMock.mockReturnValue({ marketId, spread: 0.6 });

    req.params = { marketId };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await getUpdateAlertByMarketId(req, res, next);

    expect(readJsonFileMock).toHaveBeenCalledWith('alertSpread.json');
    expect(getMarketOrderBookMock).toHaveBeenCalledWith({ params: { path: { marketId } } });
    expect(calculateSpreadMock).toHaveBeenCalledWith(marketId, {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Spread is equal to the alert', state: false });
  });

  it('should call next with error if an error occurs', async () => {
    const marketId = 'BTC-CLP';
    const alerts = [{ marketId, spread: 0.5 }];
    const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
    readJsonFileMock.mockRejectedValue(new Error('File read error'));

    req.params = { marketId };

    await getUpdateAlertByMarketId(req, res, next);

    expect(readJsonFileMock).toHaveBeenCalledWith('alertSpread.json');
    expect(next).toHaveBeenCalledWith(new Error('File read error'));
  });
});