import { Request, Response } from "express";
import { likeUser, getMathes } from "../services/match.service";

export const handleLike = (req : Request, res : Response) => {
  const {from , to} = req.body

  if (!from || to){
    return res.status(400).json({error: "missing data"})
  }
  const result = likeUser(from, to)

  res.json(result)
}

export const fetchMatches = (req : Request, res : Response) => {
  const userId = req.params.userId as string
  const data = getMathes(userId)

  res.json(data)
}