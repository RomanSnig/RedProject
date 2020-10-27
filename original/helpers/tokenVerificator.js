const jwt = require('jsonwebtoken');
const{secret, refreshSecret} = require('../constants/secret');

module.exports = (token, method) => {
    let secretWord = '';

    if (method=== 'auth' ) secretWord = secret;
    if(method=== 'refresh') secretWord = refreshSecret;

    if(!token) throw new Error('NO TOKEN!!!!!!');
    let user = null;

    jwt.verify(token, secretWord, (err, decode) =>{
        if(err) throw new Error('Not valid Token');
        user = decode
    });
    return user
};
