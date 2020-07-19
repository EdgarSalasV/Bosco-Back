import e, { Router } from 'express';
import { getComment } from '../controllers/comment.controller'

const router = Router()

router.get('/comment', getComment)
export default router
