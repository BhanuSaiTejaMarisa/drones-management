const {
  addDrone,
  getDrone,
  updateDrone,
  getAllDrones,
  deleteDrone,
  getDronesByUserId
} = require("../controllers/droneController.js");

const router = require("express").Router();

router.post("/add", addDrone);
router.get("/get/:id", getDrone);
router.get("/get-all", getAllDrones);
router.patch("/update/:id", updateDrone);
router.delete("/delete/:id", deleteDrone);
router.get("/get-by-user", getDronesByUserId);

module.exports = router;
