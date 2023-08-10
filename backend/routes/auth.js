import express from 'express'
import { Login, Registration } from '../controllers/authController.js'
const router= express.Router()

router.post('/register', Registration)
router.post('/login', Login)

export default router