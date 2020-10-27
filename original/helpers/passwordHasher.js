const bcryptJS = require('bcryptjs');

module.exports.hashPassword = async password => await bcryptJS.hash(password, 10);
module.exports.checkHashPassword = async (password, hash) => await bcryptJS.compare(password, hash);
