import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

import v1Router from "./routes/v1/v1.route";

dotenv.config();

const port = process.env.SERVER_PORT;
const dbUrl = process.env.DB_URL;
const clientUrl = process.env.CLIENT_URL

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: `${clientUrl}`,
    })
);

app.use('api/v1', v1Router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port} 🚀`);
});