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
    }
})

module.exports = model('adminSchema', adminSchema);
