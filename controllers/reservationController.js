import ApiError from "../error/ApiError.js";
import House from "../models/House.js";
import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

export const createReservation = async (req, res, next) => {
    try {
        const newReservation = new Reservation({ ...req.body });
        await newReservation.save();
        // setting unavailableDates for the house
        const house = await House.findByIdAndUpdate(req.body.house, { $push: { unavalableDates: req.body.dates } }, { new: true });

        res.status(200).json(house);
    } catch (error) {
        next(error);
    }
}

export const getUserReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ client: { _id: req.params.id } });
        let futureReservations = reservations.filter(reserv => new Date() < new Date(reserv.dates[reserv.dates.length - 1]))
        res.status(200).json(futureReservations);
    } catch (error) {
        next(error);
    }
}

export const getHouseReservations = async (req, res, next) => {
    try {
        const type = req.query.type;
        const reservations = await Reservation.find({ house: { _id: req.params.id } });
        let filteredReservations = [];

        switch (type) {
            case 'previos':
                filteredReservations = await Promise.all(
                    reservations
                        .filter(item => new Date() > new Date(item.dates[item.dates.length - 1]))
                        .map(async item => {
                            let client =  await User.findById(item.client);
                            return {
                                first_name: client.first_name,
                                last_name: client.last_name,
                                dates: item.dates,
                                guests: item.guests
                            }
                        })
                )
                break;
            case 'upcoming': 
                filteredReservations = await Promise.all(
                    reservations
                        .filter(item => new Date() < new Date(item.dates[item.dates.length - 1]))
                        .map(async item => {
                            let client =  await User.findById(item.client);
                            return {
                                first_name: client.first_name,
                                last_name: client.last_name,
                                dates: item.dates,
                                guests: item.guests
                            }
                        })
                )
                break;
            default:
                break;
        }
        res.status(200).json(filteredReservations);
    } catch (error) {
        next(error);
    }
}

export const getCountOfReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ house: { _id: req.params.id } });
        let result = {
            previos: reservations.filter(item => new Date() > new Date(item.dates[item.dates.length - 1])).length,
            upcoming: reservations.filter(item => new Date() < new Date(item.dates[item.dates.length - 1])).length
        };
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export const deleteUserReservation = async (req, res, next) => {
    try {
        const reservationID = req.params.id;
        const {dates, house} = await Reservation.findById(reservationID);
        const {unavalableDates} = await House.findById(house);

        let stringUnavailableDates = unavalableDates.map(date => date.toISOString());
        let updatedUnavailableDates = stringUnavailableDates.filter(item => !dates.includes(item));

        await House.findByIdAndUpdate(house, { $set: {unavalableDates: updatedUnavailableDates} }, { new: true });
        await Reservation.findByIdAndDelete(reservationID);

        res.status(200).json({success: true});
    } catch (error) {
        next(error)
    }
}