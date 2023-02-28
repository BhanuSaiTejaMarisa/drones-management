const {
  addDrone,
  getDrone,
  updateDrone,
  getAllDrones,
  deleteDrone,
  getDronesByUserId,
} = require("../controllers/droneController.js");

const router = require("express").Router();

router.post("/", addDrone);
router.get("/:id", getDrone);
router.get("/", getAllDrones);
router.patch("/:id", updateDrone);
router.delete("/:id", deleteDrone);
router.get("/user/:userId", getDronesByUserId);

module.exports = router;
