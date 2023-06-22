import {onRequest} from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";
import express from "express"
import cors from "cors"
import { getAllCandy, addNewCandy, updateCandyByID } from "./src/candy.js";

const app = express();
app.use(cors())
app.use(express.json());

app.get("/test", (req, res) => res.send("its working"))

app.get("/candy", getAllCandy);
app.post("/candy", addNewCandy);
app.patch("/candy/:candyID", updateCandyByID)


export const api =  onRequest({ maxInstances: 10}, app);