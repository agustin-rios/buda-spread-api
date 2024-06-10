import express, { 
    Application, Request, Response, NextFunction,
 } from "express";
import dotenv from "dotenv";
import cors from 'cors';

const applyRoutes = require("./routes");


dotenv.config();

// setting app
const app: Application = express();
const PORT: number = parseInt(process.env.PORT ?? '8080');

// rules of our app
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
)

// setting the routes
const welcome = 'Welcome to Buda Spread API';
app.get('/', async (req: Request, res: Response) => res.send(welcome));
applyRoutes(app, 'api');

// error handling for the routes
app.use((req: Request, res: Response) => {
    const error: any = new Error('Route Not Found');
    return res.status(404).json({
      message: error.message,
    });
  });
  
  app.use((error: Error, req: Request, res: Response) => {
    console.log(`[server-error]: ${error}`);
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  });
  
// listening to server connection
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
