import express from "express";
import {
    createReservation, 
    getCountOfReservations, 
    getHouseReservations, 
    getUserReservations, 
    deleteUserReservation
} from "../controllers/reservationController.js"
import { verifyToken } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.post('/', verifyToken, createReservation);
router.get('/house/:id', verifyToken, getHouseReservations);
router.get('/user/:id', verifyToken, getUserReservations);
router.get('/getCountOfReservations/:id', verifyToken, getCountOfReservations);
router.delete('/:id', verifyToken, deleteUserReservation);
router.get('/', async (req, res) => {
    res.send('This is Reservation endpoint');
})


export default router;