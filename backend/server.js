import express from "express";
import { PORT } from "./config/index.js";
import connectDb from "./database/index.js";
import errorHandler from "./middleWare/errorHandle.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

const app = express();
app.use(cors(corsOption));
app.use(cookieParser());
connectDb();
app.use(express.json({ limit: "50mb" }));
app.use(router);
app.use("/storage", express.static("storage"));
app.use(errorHandler);
app.listen(PORT, console.log(`server is running on the port:${PORT}`));
