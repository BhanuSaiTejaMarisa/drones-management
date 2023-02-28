const {
  addSite,
  addDroneToSite,
  getSite,
  getAllSites,
  getSitesByUserId,
  // updateSite,
  // deleteSite,
  deleteDroneToSite,
} = require("../controllers/siteController.js");

const router = require("express").Router();

router.post("/", addSite);

router.get("/:id", getSite);
router.get("", getAllSites);
router.get("", getSitesByUserId);

router.patch("/:id/drones", addDroneToSite);
router.patch("/:id/drones", deleteDroneToSite);
// router.patch("/update/:id", updateSite);
// router.delete("/delete/:id", deleteSite);

module.exports = router;
