const {
  addDrone,
  getDrone,
  updateDrone,
  getAllDrones,
  deleteDrone,
 
} = require("../controllers/droneController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = require("express").Router();

router.post("/", authMiddleware, addDrone);
router.get("/:id", authMiddleware, getDrone);
router.get("/", authMiddleware, getAllDrones);
router.patch("/:id", authMiddleware, updateDrone);
router.delete("/:id", authMiddleware, deleteDrone);


module.exports = router;
