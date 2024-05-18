import express, { Express, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import Router from "./routes/index";
import cookieParser from "cookie-parser";
import { createClient } from "redis";

const app: Express = express();
const port = 3000;

export const client = createClient({
  url: "redis://localhost:6379",
  socket: {
    connectTimeout: 1000,
  },
});

client.connect().catch((err) => console.log(err));

const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "ditobayu25",
    port: 5432,
    host: "localhost",
    database: "CHALLENGE5",
  },
});

Model.knex(knexInstance);

// app.get("/", (_, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(Router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
