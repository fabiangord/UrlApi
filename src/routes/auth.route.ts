import { Router} from 'express'
import { login, register } from '../controllers/auth.controller'
import { registerFormat, validationEmailRegister } from '../middlewares/authMiddlewares/register.middleware'
import { loginFormat } from '../middlewares/authMiddlewares/login.middleware'
import { infoUser } from '../controllers/auth.controller'
import { requireToken } from '../middlewares/authMiddlewares/requireToken.middleware'

const router = Router()

router.post('/register', registerFormat, 
    validationEmailRegister,
    register)
    

router.post('/login', loginFormat, 
    validationEmailRegister,
    login)


router.post('/protect',
    requireToken,
    infoUser)

export default router