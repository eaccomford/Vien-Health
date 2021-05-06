import {Router, Request, Response} from "express"
import controller from '../controllers/user'

const router = Router()

// @route Get /auth
// @desc Athenticate a user
// @access Public

router.get('/users', controller.getAllUsers)
router.get('/login', controller.login)
router.get('/register', controller.register)
router.get('/validate', controller.validateToken)

export default router