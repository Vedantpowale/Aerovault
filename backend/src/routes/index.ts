import { Router } from "express";
import { postChat } from "../controllers/chat-controller";
import { getTracker } from "../controllers/tracker-controller";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.post("/chat", postChat);
apiRouter.get("/tracker", getTracker);
