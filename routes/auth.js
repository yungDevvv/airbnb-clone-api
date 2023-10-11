import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyToken, logoutUser);

export default router;