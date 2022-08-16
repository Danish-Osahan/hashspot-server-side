import express from 'express';

import { getposts,getpost,getpostsbysearch,getPostsByCreator,createposts,updatepost,deletepost,likepost } from '../controllers.js/posts.js';
import auth from '../middleware/auth.js';
const router=express.Router()


// http://localhost:5000/posts
router.get('/creator', getPostsByCreator);
router.get('/search',getpostsbysearch)
router.get('/',getposts)
router.get('/:id',getpost)
router.post('/',auth,createposts)
router.patch('/:id',auth,updatepost)
router.delete('/:id',auth,deletepost)
router.patch('/:id/likepost',auth,likepost)


export default router;