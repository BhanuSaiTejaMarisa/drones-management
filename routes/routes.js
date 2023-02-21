const express = require("express");
const testRouter = require("./testRouter.js");
const missionCategoryRoutes = require("./missionCategoryRoutes.js");
const droneRoutes = require("./droneRoutes.js");
const userRoutes = require("./userRoutes.js");
const siteRoutes = require("./siteRoutes.js");

const router = express.Router();

router.use("/category", missionCategoryRoutes);
router.use("/user", userRoutes);
router.use("/drone", droneRoutes);
router.use("/site", siteRoutes);
router.use("/test", testRouter);

module.exports = router;
