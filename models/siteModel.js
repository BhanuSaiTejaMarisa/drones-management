const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    site_name: {
      type: String,
      unique: true,
      required: true,
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
    missions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Mission",
          validate: {
            validator: async (mission_id) => {
              const mission = await mongoose.models.Mission.findById(
                mission_id
              );
              return mission !== null;
            },
            message: "Invalid mission id",
          },
        },
      ],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    //   ref:"User"
    },
  },
  {
    timestamps: true,
  }
);

const SiteModel = mongoose.model("Site", siteSchema);

module.exports = SiteModel;
