const {Schema, model, Types} = require('mongoose');

const works = new Schema({
    name: {
        type: String
    },
    text: {
        type: String
    },
    personId: {
        type: Types.ObjectId,
        ref: 'personSchema'
    }
});

module.exports = model('worksSchema', works);
