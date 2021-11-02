const express = require("express");
const router = express.Router();
const config = require("../config");
const { Op } = require("sequelize");
const { User } = require("../models");
const middleware = require("../middlewares/user.middleware");


router.get("/", async (req, res, next) => {
    res.json({
        success: true,
        message: "Successful response.",
        data: {name: "Maaz", age: 22}
    });
});

router.post("/", middleware.hasRequiredFields, async (req, res, next) => {

    // const read_filter = { where: {[Op.or]: [{email_address: req.body.email_address}, 
    //     {phonenumber: req.body.phonenumber}] } };
    const email_read_filter = { where: { email_address: req.body.email_address} };
    await User.findOne(email_read_filter).then(function(user){
        if (user)
            return res.status(400).json({
                success: false,
                message: "User with this email already exist."
            })
    });
        
    const phone_read_filter = { where: { phonenumber: req.body.phonenumber} };
    await User.findOne(phone_read_filter).then(function(user){
        if (user)
            return res.status(400).json({
                success: false,
                message: "User with this phone number already exist."
            })
    });

    const user = await User.create({
        name: req.body.name,
        email_address: req.body.email_address,
        phonenumber: req.body.phonenumber,
        password: req.body.password
    })
    res.json({
        success: true,
        message: "woahhh",
        data: user
    })

});

module.exports = router;