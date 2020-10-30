const {Schema, model, Types} = require('mongoose');
const works = new Schema({
    name: {
        type: String
    },
    style: {
        type: String
    },
    adminId: {
        type: Types.ObjectId,
        ref: 'adminSchema'
    },
    dateOfCreation: {
        type: String
    }
});

module.exports = model('worksSchema', works);
