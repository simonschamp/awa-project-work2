import express, { Express } from "express";
import path from "path";

import router from "./src/router/index";
import userRouter from "./src/router/user";
import columnRouter from "./src/router/column";
import morgan from "morgan"; // that helps us get logs and see how our app is working
import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT as string) || 8001;

const mongoDB: string = "mongodb://127.0.0.1:27017/FullStackDB";

mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);
app.use("/user", userRouter);
app.use("/", columnRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
