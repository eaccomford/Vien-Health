import {Router} from "express"
import auth from "./user"
import page_contentt from "./page-content"

const router = Router()

router.use('/user', auth)
router.use('/page-content', page_contentt)

export default router