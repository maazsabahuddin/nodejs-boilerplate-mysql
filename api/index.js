const express = require("express");
const router = express.Router();
const userRouter = require("./user");

router.get("/", (req, res, next) => {
    res.json({
        success: true,
        message: "Welcome to nodejs leaning school!"
    })
});

router.use("/user", userRouter);

module.exports = router;