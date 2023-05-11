const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/admin_controller");

router.get(
    "/admin-page",
    passport.checkAuthentication,
    adminController.adminPage
);

router.post(
    "/set-Reviewers",
    passport.checkAuthentication,
    adminController.setReviewrs
);

router.post(
    "/newAdmin",
    passport.checkAuthentication,
    adminController.newAdmin
);

router.get(
    "/view-employees",
    passport.checkAuthentication,
    adminController.viewEmployees
);

router.get(
    "/delete-employee/:id",
    passport.checkAuthentication,
    adminController.deleteEmployee
);

module.exports = router;
