import { Router } from "express"
import cardController from "../controllers/card.controller"

const router = Router()

router.post('/createcard', cardController.createCard)
router.get('/mycard', cardController.getCard)
router.get('/feed', cardController.feed)
router.post('/swipe', cardController.swipe)      

export default router