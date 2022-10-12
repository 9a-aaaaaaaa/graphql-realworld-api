"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtSecret = exports.genergetToken = exports.md5 = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
function md5(str) {
    return (0, crypto_1.createHash)('md5')
        .update('I love cupcakes' + str)
        .digest('hex');
}
exports.md5 = md5;
async function genergetToken(user, jwtSecret) {
    const token = (0, jsonwebtoken_1.sign)({ userId: user._id }, jwtSecret, { expiresIn: 60 * 60 * 24 });
    return token;
}
exports.genergetToken = genergetToken;
function getJwtSecret() {
    const jwtSecret = process.env.jwtSecret;
    if (!jwtSecret)
        throw new apollo_server_express_1.UserInputError('配置文件 jwtSecret not founded');
    return jwtSecret;
}
exports.getJwtSecret = getJwtSecret;
//# sourceMappingURL=index.js.map