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
        type: String
    },
    timeOfLastChange: {
        type: String
    }
})

module.exports = model('adminSchema', adminSchema);
