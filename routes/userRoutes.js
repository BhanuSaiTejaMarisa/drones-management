const {
  addUser,
  getUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/", addUser);
router.get("/:userId", getUser);
router.get("/", getAllUsers);
router.patch("/:userId", updateUser);
// router.delete("/delete", deleteUser);

module.exports = router;
