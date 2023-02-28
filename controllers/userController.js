const DroneModel = require("../models/droneModel.js");
const UserModel = require("../models/userModel.js");

async function addUser(req, res) {
  try {
    const data = req.body;
    const user = new UserModel(data);
    const dataToSave = await user.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function addDrone(req, res) {
  try {
    const droneId = req.params.id;
    const options = { new: true };
    const updateduser = await UserModel.findByIdAndUpdate(
      droneId,
      req.body,
      options
    );
    res.status(200).json(updatedDrone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const data = await UserModel.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateUser = async function (req, res) {
  try {
    const userId = req.params.id;
    const options = { new: true };
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      req.body,
      options
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { addUser, updateUser, getUser, getAllUsers };
