import mongoose from 'mongoose';
const { Schema } = mongoose;

const houseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    house_type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    guests: {
        type: Number
    },
    bedroom: {
        type: Number
    },
    beds: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    comforts: {
        type: [String]
    },
    
    images: {
        type: [String]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    unavalableDates: {type: [Date]}
});

export default mongoose.model("House", houseSchema)