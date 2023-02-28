const express = require("express");
const testRouter = require("./testRouter.js");
const missionCategoryRoutes = require("./missionCategoryRoutes.js");
const droneRoutes = require("./droneRoutes.js");
const userRoutes = require("./userRoutes.js");
const siteRoutes = require("./siteRoutes.js");

const router = express.Router();

router.use("/categories", missionCategoryRoutes);
router.use("/users", userRoutes);
router.use("/drones", droneRoutes);
router.use("/sites", siteRoutes);
router.use("/test", testRouter);

module.exports = router;
