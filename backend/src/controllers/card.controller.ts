import CardService from "../services/card.service";
import AuthService from "../services/auth.service";
import { Request, Response } from "express";

class CardController {
  async createCard(req: Request, res: Response) {
    try {
      const { token, questionary } = req.body;
      if (!questionary) {
        return res.status(400).json({ success: false, error: "Анкета не передана" });
      }
      if (!token) {
        return res.status(401).json({ success: false, error: "Вы не авторизованы" });
      }

      const result = await CardService.createCard(token, questionary);
      return res.status(201).json({ success: true, data: result });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }
  async getCard(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, error: "Вы не авторизованы" });
      }
      const result = await CardService.getCard(token);
      return res.status(200).json({ success: true, data: result });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }
  async feed(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Вы не авторизованы" });
    }

    const payload = await AuthService.verifyToken(token);
    const feed = await CardService.getFeed(payload.id);
    return res.status(200).json({ success: true, data: feed });
  } catch (e: any) {
    return res.status(400).json({ success: false, error: e.message });
  }
}

async swipe(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Вы не авторизованы" });
    }

    const { targetUserId, action } = req.body;
    if (!targetUserId || !action) {
      return res.status(400).json({ success: false, error: "Не указан пользователь или действие" });
    }
    if (action !== 'like' && action !== 'dislike') {
      return res.status(400).json({ success: false, error: "Действие должно быть like или dislike" });
    }

    const payload = await AuthService.verifyToken(token);
    const result = await CardService.swipe(payload.id, targetUserId, action);
    return res.status(200).json({ success: true, ...result });
  } catch (e: any) {
    return res.status(400).json({ success: false, error: e.message });
  }
}
}

export default new CardController();