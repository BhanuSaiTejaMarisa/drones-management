const router = require("express").Router();
const {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
} = require("../controllers/missionCategoryController");

router.post("/add-category", addCategory);
router.get("/get/:id", getCategoryById);
router.get("/get-all", getAllCategories);
router.patch("/update/:id", updateCategory);

module.exports = router;
