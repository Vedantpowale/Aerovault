import type { Request, Response, NextFunction } from "express";
import { generateChatReply } from "../services/chat-service";

export async function postChat(req: Request, res: Response, next: NextFunction) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages array" });
      return;
    }

    const reply = await generateChatReply(messages);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
}
