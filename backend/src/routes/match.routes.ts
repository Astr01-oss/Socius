import { Router } from "express";
import { handleLike, fetchMatches } from "../controllers/match.controller";

const router = Router()

router.post("/like", handleLike)
router.get('/:userId', fetchMatches)

export default router