import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.mjs";
import bodyParser from "body-parser";
import { ErrorHandler } from "./middlewares/errorHandlerMiddleware.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/api/auth", authRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
