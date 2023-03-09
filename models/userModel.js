const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  passwordHash: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  sites: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        validate: {
          validator: async (site_id) => {
            const site = await mongoose.models.Site.findById(site_id);
            return site !== null;
          },
          message: "Invalid site id",
        },
      },
    ],
  },
  drones: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drone",
        validate: {
          validator: async (drone_id) => {
            const drone = await mongoose.models.Drone.findById(drone_id);
            return drone !== null;
          },
          message: "Invalid drone id",
        },
      },
    ],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
