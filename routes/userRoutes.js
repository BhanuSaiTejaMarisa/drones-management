const {
  addUser,
  getUser,
  updateUser,
  getAllUsers,
  getDronesByUserId
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = require("express").Router();

router.post("/", authMiddleware, addUser);
router.get("/:userId", authMiddleware, getUser);
router.get("/", authMiddleware, getAllUsers);
router.patch("/:userId", authMiddleware, updateUser);
router.get("/:userId/drones", authMiddleware, getDronesByUserId);

// router.delete("/delete", deleteUser);

module.exports = router;
