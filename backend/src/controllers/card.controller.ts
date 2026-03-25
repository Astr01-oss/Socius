import CardService from "../services/card.service";
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
  async getCard(req: Request, res: Response){
    try{
      const {token} = req.body
      if (!token) {
        return res.status(401).json({ success: false, error: "Вы не авторизованы" });
      }
      const result = await CardService.getCard(token);
      return res.status(201).json({ success: true, data: result });
    }catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }
}

export default new CardController();