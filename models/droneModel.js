const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    make_name: {
      type: String,
    },
    site_id: {
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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async (user_id) => {
          const user = await mongoose.models.User.findById(user_id);
          return user !== null;
        },
        message: "Invalid user id",
      },
    },
    drone_id: {
      type: String,
      unique: true,
      required: true,
      default: () => {
        return Math.random().toString(36).substring(2, 9);
      },
    },
  },
  {
    timestamps: true,
  }
);

const DroneModel = mongoose.model("Drone", droneSchema);

module.exports = DroneModel;
