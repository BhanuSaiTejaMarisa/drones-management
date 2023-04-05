const express = require("express");
const testRouter = require("./testRouter.js");
const missionCategoryRoutes = require("./missionCategoryRoutes.js");
const droneRoutes = require("./droneRoutes.js");
const userRoutes = require("./userRoutes.js");
const siteRoutes = require("./siteRoutes.js");
const authRoutes = require("./authRoutes.js");
const testEmailRoutes = require("./testEmailRoutes.js");
const getGoogleOauthUrlRoutes = require("./getGoogleOauthurlRoutes.js");
const googleOauthCallbackRoute = require("./googleOauthCallbackRoute.js")
const router = express.Router();

router.use("/", authRoutes);
router.use("/auth/google/url", getGoogleOauthUrlRoutes);
router.use("/auth/google/callback", googleOauthCallbackRoute);
router.use("/categories", missionCategoryRoutes);
router.use("/users", userRoutes);
router.use("/drones", droneRoutes);
router.use("/sites", siteRoutes);
router.use("/test", testRouter);
// router.use("/test-email", testEmailRoutes);

module.exports = router;
