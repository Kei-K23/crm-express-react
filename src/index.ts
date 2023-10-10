import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import routers from "./routers";

require("dotenv").config();

import mongoose from "mongoose";
import { UserRole } from "./db/user";

const port = 8080;
const url = "mongodb://127.0.0.1:27018/crm";
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(url);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", routers());

app.listen(port, () => console.log(`Server is running on port: ${port}`));
