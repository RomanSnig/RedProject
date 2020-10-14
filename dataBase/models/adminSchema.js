const {Schema, model, Types} = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    rights: {
        type: Number
    },
    status: {
        type: Number,
        // ref: 'adminStatus'
    }
})

module.exports = model('adminSchema', adminSchema);
