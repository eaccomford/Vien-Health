import {Router} from "express"
import controller from '../controllers/pageContent'
import extractJWT from '../middleware/extractJWT'

import multer from 'multer'

const router = Router()

// @route Get /auth
// @desc Athenticate a user
// @access Public

const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });


router.post('/profile', upload.single('file'), controller.profile)
router.get('/pages', extractJWT, controller.getPages)
router.post('/store', controller.store)

export default router