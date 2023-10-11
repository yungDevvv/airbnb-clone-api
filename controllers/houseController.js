import House from "../models/House.js";
import { shuffleArray } from "../utils/shuffleArray.js";
import { v2 as cloudinary } from 'cloudinary';
import ApiError from "../error/ApiError.js";

export const createHouse = async (req, res, next) => {
    const newHouse = new House({ ...req.body, owner: req.user.id });
    
    try {
        const savedHouse = await newHouse.save();
        res.status(200).json(savedHouse);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteHouse = async (req, res, next) => {
    const houseID = req.params.id;
    const userID = req.user.id;

    const deletingHouse = await House.findById(houseID);

    if (deletingHouse.owner.toHexString() !== userID) return next(ApiError.forbidden("Something went wrong, you are not the owner of this house!"));
    
    try {
        deletingHouse.images.forEach(async img => {
            const public_id = img.split('.')[2].split('/')[6];
            const res = await cloudinary.uploader.destroy('upload/' + public_id);
        })
        await House.findByIdAndDelete(req.params.id);
        res.status(200).json("House has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateHouse = async (req, res, next) => {
    try {
        const updatedHouse = await House.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHouse);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserHouses = async (req, res, next) => {
    try {
        let id = req.params.id;
        const userHouses = await House.find({ owner: id });

        res.status(200).json(userHouses);
    } catch (error) {
        next(error);
    }
}

export const getAllHouses = async (req, res, next) => {
    try {
        const { unavalableDates, guests, country, beds, bedrooms, bathrooms, minPrice, maxPrice, comforts, ...others } = req.query;
        const query = {
            price: { $gte: minPrice, $lt: maxPrice },
            guests: { $gte: guests },
            beds: { $gte: beds },
            bedroom: { $gte: bedrooms },
            bathrooms: { $gte: bathrooms },
            unavalableDates: { $nin: unavalableDates },
            ...others,
        }
        if (comforts) query.comforts = { $all: comforts };
        if (country !== '0') query.country = country;
        const houses = await House.find(query);
        res.status(200).json(shuffleArray(houses));
    } catch (error) {
        next(error);
    }
}

export const countHousesByFilter = async (req, res, next) => {
    try {
        const { unavalableDates, guests, country, beds, bedrooms, bathrooms, minPrice, maxPrice, comforts, ...others } = req.query;
        const query = {
            price: { $gte: minPrice, $lt: maxPrice },
            guests: { $gte: guests },
            beds: { $gte: beds },
            bedroom: { $gte: bedrooms },
            bathrooms: { $gte: bathrooms },
            unavalableDates: { $nin: unavalableDates },
            ...others,
        }
        if (comforts) query.comforts = { $all: comforts };
        if (country !== '0') query.country = country;
        const houses = await House.countDocuments(query);
        res.status(200).json(houses);
    } catch (error) {
        next(error);
    }
}

export const getHouse = async (req, res, next) => {
    try {
        const house = await House.findById(req.params.id);
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const checkAvailability = async (req, res, next) => {
    let dates = req.body.dates;
    console.log(dates)
    if (dates.length < 1 || new Date(dates[0]) < new Date()) {
        // we can't work with only one date
        // is date is past time
        res.status(200).json(false);
    };
    try {
        const house = await House.findOne({ _id: req.params.id, unavalableDates: { $nin: dates } });
        let isAvailable = house !== null;
        res.status(200).json(isAvailable);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteImage = async (req, res, next) => {
    try {
        const { public_id, house_id, img } = req.body;
        const house = await House.findByIdAndUpdate(house_id, { $pull: { images: img } }, { new: true });
        
        await cloudinary.uploader.destroy('upload/' + public_id);

        res.status(200).json(house)
    } catch (error) {
        console.log(error);
        next(error);
    }
}
