const DroneModel = require("../models/droneModel.js");
const UserModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");


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
    const userId = req.params.userId;
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: "No authorization header sent" })
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) res.status(401).json({ message: "Unable to verify token" })

      const { id, isVerified } = decoded;

      if (id !== userId) res.status(403).json({ message: "Not allowed to update that user\'s data" })
      if(!isVerified) return res.status(403).json({message:"You need to verify your email before you can update your data"});

      const options = { new: true };
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        req.body,
        options
      );
      const { email } = updatedUser;
      jwt.sign({ id, email, isVerified }, process.env.JWT_SECRET, { expiresIn: "2d" }, (err, token) => {
        if (err) res.status(200).json(err)

        res.status(200).json({ token });//updatedUser
      })
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { addUser, updateUser, getUser, getAllUsers };
