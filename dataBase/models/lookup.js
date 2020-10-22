const {Schema, model} = require('mongoose');

const lookup = new Schema({
    key: String,
    subject: String,
    type: String,
    timeOfCreate: String,
    timeOfLastChange: String
});

module.exports = model('lookupData', lookup);
