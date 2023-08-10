import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js'
const router =express.Router();

import { verifyTokent, verifyUser } from '../utils/verifyToken.js';



// update User
router.put('/:id',verifyUser, updateUser)

// delete User
router.delete('/:id',verifyUser, deleteUser)

// get single User
router.get('/:id',verifyUser, getSingleUser)

// get all User
router.get('/',verifyUser, getAllUser)

export default router