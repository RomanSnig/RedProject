const {Schema, model} = require('mongoose');

const lookup = new Schema({
    key: Number,
    subject: String,
    type: String,
    timeOfCreate: String,
    timeOfChange: String
});

module.exports = model('lookupData', lookup);
