import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import MatchService from "../services/match.service";

class MatchController {
  async getLikes(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, error: "Вы не авторизованы" });
      }
      const payload = await AuthService.verifyToken(token);
      const likes = await MatchService.getLikes(payload.id);
      return res.status(200).json({ success: true, data: likes });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  async getMatches(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, error: "Вы не авторизованы" });
      }
      const payload = await AuthService.verifyToken(token);
      const matches = await MatchService.getMatches(payload.id);
      return res.status(200).json({ success: true, data: matches });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }
}

export default new MatchController();