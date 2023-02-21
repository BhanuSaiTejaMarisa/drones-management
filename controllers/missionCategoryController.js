const MissionCategoryModel = require("../models/missionCategoryModel");

async function addCategory(req, res) {
  try {
    const data = req.body;
    const category = new MissionCategoryModel(data);
    const dataToSave = await category.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getCategoryById(req, res) {
  try {
    const id = req.params.id;
    const data = await MissionCategoryModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllCategories(req, res) {
  try {
    const data = await MissionCategoryModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    const id = req.params.id;
    const options = { new: true };
    const updatedData = await MissionCategoryModel.findByIdAndUpdate(
      id,
      req.body,
      options
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
};
