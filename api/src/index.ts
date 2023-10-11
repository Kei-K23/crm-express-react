import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import routers from "./routers";

require("dotenv").config();

import mongoose from "mongoose";

const port = 8080;
const url = "mongodb://127.0.0.1:27018/crm";
const app = express();

app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.cookies["crmCookie"]);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

mongoose.connect(url);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", routers());

app.listen(port, () => console.log(`Server is running on port: ${port}`));
