import mongoose from 'mongoose';

const airQualitySchema = new mongoose.Schema({
    ts: {
        type: Date,
        required: true
    },
    aqius: {
        type: Number,
        required: true
    },
    mainus: {
        type: String,
        required: true
    },
    aqicn: {
        type: Number,
        required: true
    },
    maincn: {
        type: String,
        required: true
    }
}, { timestamps: true, })


export default mongoose.model('air_quality', airQualitySchema);