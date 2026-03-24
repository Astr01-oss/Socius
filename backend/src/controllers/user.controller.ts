import { Request, Response } from "express";
import { getAllusers } from "../services/user.service";

export const fetchUsers = (req: Request, res : Response) => {
  const data = getAllusers()
  res.json(data)
}