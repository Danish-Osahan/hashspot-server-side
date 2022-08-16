import express from 'express';
import { signin,signup} from '../controllers.js/user.js';


const router=express.Router()

router.post('/signin',signin)
router.post('/signup',signup)






export default router;