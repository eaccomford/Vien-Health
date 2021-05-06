import {Router, Request, Response} from "express"

const router = Router()

// @route Get /auth
// @desc Athenticate a user
// @access Public

router.get('/', (req:Request, res: Response)=>{
    res.sendStatus(200)
})
router.get('/login', (req:Request, res: Response)=>{
    res.sendStatus(200)
})
router.get('/register', (req:Request, res: Response)=>{
    res.sendStatus(200)
})

export default router