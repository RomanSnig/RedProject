const {Schema, model, Types} = require('mongoose');

const personSchema = new Schema({
    email: String,
    password: String,
    token: Object,
    adminId: {
        type: Types.ObjectId,
        ref: 'adminSchema'
    }
});
module.exports = model('personSchema', personSchema);
