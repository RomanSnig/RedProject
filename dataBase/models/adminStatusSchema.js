const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminStatus = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('adminStatus', adminStatus);