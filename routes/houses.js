import express from "express";
import {
    createHouse,
    deleteHouse,
    updateHouse,
    getAllHouses,
    getHouse,
    checkAvailability,
    countHousesByFilter,
    getUserHouses,
    deleteImage
} from "../controllers/houseController.js"
import { verifyToken } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.post('/', verifyToken, createHouse);
router.put('/:id', verifyToken, updateHouse);
router.get('/', getAllHouses);
router.get('/getUserHouses/:id', verifyToken, getUserHouses);
router.get('/countHousesByFilter', countHousesByFilter);
router.get('/:id', getHouse);
router.post('/checkAvailability/:id', checkAvailability);
router.delete('/:id', verifyToken, deleteHouse);
router.post('/deleteImage', verifyToken, deleteImage);

export default router;