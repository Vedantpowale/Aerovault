import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error("http_error", {
    method: req.method,
    path: req.originalUrl,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });

  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
}
