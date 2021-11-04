const config = require("../config");
const jwt = require("jsonwebtoken");
const user_controller = require("../controllers/user/user.controller");
const { get_response_object } = require("./utils/response");


module.exports.isAuthenticated = async (req, res, next) => {

    let auth_token = req.headers['authorization'];
    if (!auth_token)
        return res.status(401).json(get_response_object(false, 401, "No token found in headers."));
    
    auth_token = auth_token.split(' ');
    if (auth_token[0] !== 'Bearer')
        return res.status(401).json(get_response_object(false, 401, "Invalid type of token."));
    
    jwt.verify(auth_token[1], config.JWT_SECRET, async (err, decoded) => {
        
        if (err) return res.status(401).json(get_response_object(false, 401, "Invalid type of token."));

        const user = await user_controller.get_user_by_id(decoded.user_id);
        if (!user) return res.status(401).json(get_response_object(false, 401, "User doesn't exist."));
        
        req.userId = decoded.user_id;
        user.password = undefined;
        req.user = user;
        return next();    
    });

};
