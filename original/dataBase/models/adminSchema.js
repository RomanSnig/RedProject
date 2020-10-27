const {Schema, model, Types} = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    phone: {
        type: String
    },
    rights: {
        type: String
    },
    status: {
        type: String
        // ref: 'adminStatus'
    },
    timeOfCreate: {
        type: Date
    },
    timeOfLastChange: {
        type: Date
    }
})

module.exports = model('adminSchema', adminSchema);
