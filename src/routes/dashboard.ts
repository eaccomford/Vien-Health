import {Router, Request, Response} from "express"

const router = Router()

// @route Get /dashboard
// @desc Athenticate a user
// @access Public

router.get('/', (req:Request, res: Response)=>{
    res.sendStatus(200)
})

export default router