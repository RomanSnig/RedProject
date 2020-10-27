const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/admins', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(`${process.argv[3]}`, {useNewUrlParser: true, useUnifiedTopology: true});
// console.log(process.argv);
module.exports = mongoose;
