import mongoose from 'mongoose';
const { Schema } = mongoose;

const reservationSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House',
        required: true
    },
    dates: {
        type: [String],
        required: true
    }
}, {timestamps: true});

export default mongoose.model("Reservation", reservationSchema)