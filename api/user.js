const express = require("express");
const router = express.Router();
const config = require("../config");
const { Op } = require("sequelize");
const { User } = require("../models");
const middleware = require("../middlewares/user.middleware");


router.get("/", (req, res, next) => {
    
    res.json({
        success: true,
        message: "Successful response.",
        data: {name: "Maaz", age: 22}
    });

});

router.post("/", middleware.hasRequiredFields, async (req, res, next) => {

    // User.sync(function() { console.log("syncc");})
    // const read_filter = { where: {[Op.or]: [{email_address: req.body.email_address}, 
    //     {phonenumber: req.body.phonenumber}] } };
    const email_read_filter = { where: { email_address: req.body.email_address} };
    if (await User.findOne(email_read_filter))
        return res.status(400).json({
            success: false,
            message: "User with this email already exist."
        })
        
    const phone_read_filter = { where: { phonenumber: req.body.phonenumber} };
    if (await User.findOne(phone_read_filter))
        return res.status(400).json({
            success: false,
            message: "User with this phone number already exist."
        })
        
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

router.post("/auth/login", middleware.hasLoginRequiredFields, async (req, res, next) => {

    const email_read_filter = { where: { email_address: req.body.email_address} };
    const user = await User.findOne(email_read_filter);
    if (!user)
        return res.status(400).json({
            success: false,
            message: "User with this email does not exist."
        })
    
    if (!user.comparePassword(req.body.password)) 
        return res.status(400).json({
            success: false,
            message: "Invalid password brother."
        })

    res.json({
        success: true,
        messgae: "Successful",
        token: 'thori der mae aega yeh..'
    })

});

module.exports = router;