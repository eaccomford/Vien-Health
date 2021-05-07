import {Router} from "express"
import controller from '../controllers/user'
import extractJWT from '../middleware/extractJWT'

const router = Router()

// @route Get /auth
// @desc Athenticate a user
// @access Public

router.get('/users', extractJWT, controller.getAllUsers)
router.put('/logout', controller.logoutUser)
router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/validate', extractJWT, controller.validateToken)

export default router