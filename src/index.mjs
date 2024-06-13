import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.mjs";
import { productRouter } from "./routes/product.mjs";
import { orderRouter } from "./routes/order.mjs";
import bodyParser from "body-parser";
import { ErrorHandler } from "./middlewares/errorHandlerMiddleware.mjs";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/product", authMiddleware, productRouter);
app.use("/api/order", authMiddleware, orderRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
