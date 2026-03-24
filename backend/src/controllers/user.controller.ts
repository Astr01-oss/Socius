import { Request, Response } from "express";
import { getAllUsers } from '../services/user.service';

export const fetchUsers = (req: Request, res: Response) => {
  const data = getAllUsers()
  res.json(data)
}