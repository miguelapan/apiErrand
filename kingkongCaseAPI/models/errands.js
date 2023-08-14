const mongoose = require('mongoose')

const errandsSchema = new mongoose.Schema({
    task: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String
    },
    comments: {
        type: String,
        default: "skriv en kommentar"
    },
    status: {
        type: String,
        enum: ['WAITING', 'ONGOING', 'FINISHED'],
        default: 'WAITING'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Errands', errandsSchema)