const { User } = require("../../models");
const { Op } = require("sequelize");
const token_utils = require("../../services/utils/token_utils");
const { get_response_object } = require("../../services/utils/response");


module.exports.get_user_by_id = async (id) => {
    const read_filter = {where: { user_id: id }};
    return await User.findOne(read_filter);
}

const fetch_all_users = async () => {
    return await User.findAll();
}

module.exports.create_user = async (req, res, next) => {

    // User.sync(function() { console.log("syncc");})
    // const read_filter = { where: {[Op.or]: [{email_address: req.body.email_address}, 
    //     {phonenumber: req.body.phonenumber}] } };
    const email_read_filter = { where: { email_address: req.body.email_address} };
    if (await User.findOne(email_read_filter)){
        const response = get_response_object(false, 400, "User with this email already exist.");
        return res.status(400).json(response);
    }
        
    const phone_read_filter = { where: { phonenumber: req.body.phonenumber} };
    if (await User.findOne(phone_read_filter)) {
        const response = get_response_object(false, 400, "User with this phone number already exist.");
        return res.status(400).json(response);
    }
        
    const user = await User.create({
        name: req.body.name,
        email_address: req.body.email_address,
        phonenumber: req.body.phonenumber,
        password: req.body.password
    })

    const response = get_response_object(true, 200, "Successful", {user: user, token: token_utils.get_user_token(user.user_id)});
    res.json(response);

}

module.exports.login_user = async (req, res, next) => {

    const email_read_filter = { where: { email_address: req.body.email_address} };
    const user = await User.findOne(email_read_filter);
    if (!user) {
        const response = get_response_object(false, 400, "User with this email does not exist.");
        return res.status(400).json(response);
    }
    
    if (!user.comparePassword(req.body.password)) {
        const response = get_response_object(false, 400, "Invalid password.");
        return res.status(400).json(response);
    }

    const response = get_response_object(true, 200, "Successful", {name: user.name, token: token_utils.get_user_token(user.user_id)});
    res.json(response);

}

module.exports.get_my_data = async (req, res, next) => {

    const response = get_response_object(true, 200, "Successful", {user: req.user});
    res.json(response);

}

module.exports.get_all_users = async (req, res, next) => {
    
    const users = await fetch_all_users();

    const response = get_response_object(true, 200, "Successful", {users: users});
    res.json(response);

}
