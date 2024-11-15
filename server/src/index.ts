import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import v1Router from "./routes/v1/v1.route";
import { ZodError } from 'zod';

// load environment variables
dotenv.config();

// environment variables
const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: `${CLIENT_URL}`,
    })
);

// v1 router
app.use('/api/v1', v1Router);

// PORT
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT} 🚀`);
});