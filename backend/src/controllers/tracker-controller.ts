import type { NextFunction, Request, Response } from "express";
import { fetchActiveFlights } from "../services/tracker-service";

export async function getTracker(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await fetchActiveFlights();
    res.json(data);
  } catch (error) {
    next(error);
  }
}
