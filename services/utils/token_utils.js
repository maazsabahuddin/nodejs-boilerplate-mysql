const config = require("../../config");
const jwt = require("jsonwebtoken");

module.exports.get_user_token = (user_id) => {
    return jwt.sign({ user_id: user_id }, config.JWT_SECRET, { expiresIn: config.JWT_TOKEN_EXPIRATION_TIME });
}
