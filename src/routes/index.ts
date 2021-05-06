import {Router} from "express"
import auth from "./user"
import dashboard from "./dashboard"

const router = Router()

router.use('/user', auth)
router.use('/dashboard', dashboard)

export default router