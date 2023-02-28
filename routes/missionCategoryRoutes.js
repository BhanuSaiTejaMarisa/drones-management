const router = require("express").Router();
const {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
} = require("../controllers/missionCategoryController");

router.post("/", addCategory);

router.get("/:id", getCategoryById);
router.get("/", getAllCategories);

router.patch("/:id", updateCategory);

module.exports = router;
