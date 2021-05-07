import {Router} from "express"
import auth from "./user"

const router = Router()

router.use('/user', auth)

export default router