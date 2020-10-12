const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Boolean
    }
})

module.exports = mongoose.model('adminSchema', adminSchema);