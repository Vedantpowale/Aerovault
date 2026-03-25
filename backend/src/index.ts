import "dotenv/config";
import cors from "cors";
import express from "express";
import { validateEnv } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { requestLogger } from "./middleware/request-logger";
import { apiRouter } from "./routes";
import { logger } from "./utils/logger";

const env = validateEnv();
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info("backend_started", {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  });
});
