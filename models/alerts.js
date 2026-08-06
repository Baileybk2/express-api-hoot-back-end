const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
    messages: {
        type: [String],
        default: []
    },
    alertType: {
        type: String,
        enum: ['warning', 'no_alert'],
        default: 'no_alert'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Alert = mongoose.model('Alert', alertSchema)
module.exports = {Alert}