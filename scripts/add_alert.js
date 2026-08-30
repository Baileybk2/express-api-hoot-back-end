const mongoose = require('mongoose')
require('dotenv').config()

const User = require('../models/user')
const { Alert } = require('../models/alerts')

async function addTestAlert() {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    const alert = await Alert.create({
        messages: [
            'This is a test alert.',
            'Please review your account.'
        ],
        alertType: 'warning'
    })

    await User.findOneAndUpdate(
        { username: 'Bailey' },
        { alert: alert._id }
    )

    console.log('Alert added!')

    // Disconnect when finished
    await mongoose.disconnect()
}

addTestAlert().catch(console.error)