import { Router } from "express"
import matchController from "./../controllers/match.controller"

const router = Router()

router.get('/likes', matchController.getLikes)
router.get('/matches', matchController.getMatches)

export default router