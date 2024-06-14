import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.mjs";
import { productRouter } from "./routes/product.mjs";
import { orderRouter } from "./routes/order.mjs";
import bodyParser from "body-parser";
import { ErrorHandler } from "./middlewares/errorHandlerMiddleware.mjs";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./swagger.mjs";

// Generating an OpenAPI specification using the swaggerJsdoc library and the swaggerConfig.
const specs = swaggerJsdoc(swaggerConfig);

// Loading environment variables from a .env file using the dotenv library.
dotenv.config();

// Creating an instance of the Express.js app and setting the PORT number.
const app = express();
const PORT = process.env.PORT || 8080;

// Using the body-parser middleware to parse JSON bodies.
app.use(bodyParser.json());

// Using the cookie-parser middleware to parse Cookie headers.
app.use(cookieParser());

// Mounting the authRouter at the /api/auth path.
app.use("/api/auth", authRouter);

// Mounting the productRouter at the /api/product path, with the authMiddleware applied.
app.use("/api/products", authMiddleware, productRouter);

// Mounting the orderRouter at the /api/order path, with the authMiddleware applied.
app.use("/api/orders", authMiddleware, orderRouter);

// Serving the Swagger UI at the /api-doc path, using the OpenAPI specification generated earlier.
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs));

// Using the ErrorHandler middleware to catch and handle errors.
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
