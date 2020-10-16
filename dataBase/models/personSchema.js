const {Schema, model} = require('mongoose');

const personSchema = new Schema({
    email: String,
    password: String,
    token: Object
});
module.exports = model('personSchema', personSchema);
