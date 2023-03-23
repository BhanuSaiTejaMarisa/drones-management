const {
  addSite,
  addDroneToSite,
  getSite,
  getAllSites,
  getSitesByUserId,
  // updateSite,
  deleteSite,
  deleteDroneToSite,
} = require("../controllers/siteController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = require("express").Router();

router.post("/", authMiddleware, addSite);

router.get("/:id", authMiddleware, getSite);
router.get("", authMiddleware, getAllSites);
router.get("/users/:userId", authMiddleware, getSitesByUserId);

router.patch("/:id/drones", authMiddleware, addDroneToSite);
router.patch("/:id/drones", authMiddleware, deleteDroneToSite);
// router.patch("/update/:id", updateSite);
router.delete("/:id", deleteSite);

module.exports = router;
