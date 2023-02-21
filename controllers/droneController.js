const DroneModel = require("../models/droneModel.js");
const UserModel = require("../models/userModel.js");

async function addDrone(req, res) {
  try {
    const userId = req.query.userId;
    const data = req.body;
    const drone = new DroneModel({ ...data, user_id: userId });
    const dataToSave = await drone.save();
    const options = { new: true };
    const updatedUserData = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { drones: drone._id } },
      options
    );
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getDrone(req, res) {
  try {
    const id = req.params.id;
    const data = await DroneModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllDrones(req, res) {
  try {
    const drones = await DroneModel.find();
    res.status(200).json(drones);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getDronesByUserId(req, res) {
  try {
    const user_id = req.query.userId;
    const user = await UserModel.findById(user_id)
      .populate("drones")
      .exec((err, user) => {
        if (err) {
          console.error(err);
          return;
        }
        return res.status(200).json(user.drones);
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateDrone(req, res) {
  try {
    const droneId = req.params.id;

    const options = { new: true };
    const updatedDrone = await DroneModel.findByIdAndUpdate(
      droneId,
      req.body,
      options
    );
    res.status(200).json(updatedDrone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteDrone(req, res) {
  try {
    const droneId = req.params.id;
    const deletedDrone = await DroneModel.findById(droneId);
    deletedDrone.remove();
    res.status(200).json(deletedDrone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addDrone,
  getDrone,
  getAllDrones,
  getDronesByUserId,
  updateDrone,
  deleteDrone,
};
