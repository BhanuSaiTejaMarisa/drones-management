const {
  addUser,
  getUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/add", addUser);
router.get("/get/:id", getUser);    
router.get("/get-all", getAllUsers);
router.patch("/update/:id", updateUser);
// router.delete("/delete", deleteUser);

module.exports = router;
