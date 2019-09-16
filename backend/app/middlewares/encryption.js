// Here's the required crypto code
const crypto = require('crypto');
algorithm = 'aes-256-cbc',
password = 'abcabcbacbbcabcbbacbbacbabcbabcbac125';
exports.encrypt = function (text) {
    // console.log("=====>"+text)
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text.toString(), 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
exports.decrypt = function (text) {
    // console.log("<=====" + text)
    if (text === null || typeof text === 'undefined') { return text; };
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}