import express, { 
    Application, Request, Response, NextFunction,
 } from "express";
import dotenv from "dotenv";
import cors from 'cors';

const { deleteJsonFile, createTmpFolder, writeJsonFile } = require('./util/jsonStorage');
const applyRoutes = require("./routes");

// creating tmp folder
createTmpFolder();

// if the file exists, delete it; clean data when api is restarted
deleteJsonFile('alertSpread.json');

// creating the file
writeJsonFile('alertSpread.json', []);

dotenv.config();

// setting app
const app: Application = express();

// rules of our app
app.use(express.json());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
)

// setting the routes
const welcome = 'Welcome to Buda Spread API';
app.get('/', async (req: Request, res: Response) => res.send(welcome));
applyRoutes(app, '/api');

// error handling for the routes
app.use((req: Request, res: Response) => {
    const error: any = new Error('Route Not Found');
    res.status(404).json({
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

export default app;
