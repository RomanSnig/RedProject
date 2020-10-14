const {Schema, model} = require('mongoose');

const adminStatus = new Schema({
    name: {
        type: String
    }
});

module.exports = model('adminStatus', adminStatus);
