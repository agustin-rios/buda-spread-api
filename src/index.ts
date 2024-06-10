import express, { Application } from "express";
import dotenv from "dotenv";


dotenv.config();


const app: Application = express();
const PORT: number = parseInt(process.env.PORT ?? '8080');

app.get('/', async (_req, res) => {
    res.send({
        message: `Server is running on port ${PORT}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});