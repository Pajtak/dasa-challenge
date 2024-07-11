import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes/routes.js";
import cors from "cors";

export const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);
