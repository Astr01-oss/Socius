import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка получения пользователей' });
  }
};