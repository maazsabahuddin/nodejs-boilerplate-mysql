const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/user.middleware");
const { isAuthenticated } = require("../services/auth.service");
const controller = require("../controllers/user/user.controller");


router.post("/", [middleware.hasRequiredFields, controller.create_user]);

router.post("/auth/login", middleware.hasLoginRequiredFields, controller.login_user);

router.get("/", isAuthenticated, controller.get_all_users);

router.get("/me", isAuthenticated, controller.get_my_data);

module.exports = router;