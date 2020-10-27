const jwt = require('jsonwebtoken');
const {refreshSecret, secret} = require('../constants/secret');

module.exports = (data) => {
    return {
        accessToken: jwt.sign(data, secret, { expiresIn: '24h'}),
        refreshToken:  jwt.sign(data, refreshSecret, {expiresIn: '30d'})
    };
};
