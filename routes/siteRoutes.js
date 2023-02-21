const {
  addSite,
  addDroneToSite,
  getSite,
  getAllSites,
  getSitesByUserId,
  // updateSite,
  // deleteSite,
  deleteDroneToSite
} = require("../controllers/siteController.js");

const router = require("express").Router();

router.post("/add", addSite);
router.patch("/add-drone/:id", addDroneToSite);
router.patch("/delete-drone/:id", deleteDroneToSite);

router.get("/get/:id", getSite);
router.get("/get-all", getAllSites);
router.get("/get-by-user", getSitesByUserId);
// router.patch("/update/:id", updateSite);
// router.delete("/delete/:id", deleteSite);

module.exports = router;
