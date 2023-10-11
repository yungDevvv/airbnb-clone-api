import express from "express";
import {
    deleteUser,
    updateUser,
    getAllUsers,
    getUser
} from "../controllers/userController.js" 

const router = express.Router();

router.put('/:id', updateUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);


export default router;