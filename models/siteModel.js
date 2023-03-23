const mongoose = require("mongoose");
const DroneModel = require("./droneModel");
const UserModel = require("./userModel");

const siteSchema = new mongoose.Schema(
  {
    name: {
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
            validator: async (droneId) => {
              const drone = await mongoose.models.Drone.findById(droneId);
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
            validator: async (missionId) => {
              const mission = await mongoose.models.Mission.findById(
                missionId
              );
              return mission !== null;
            },
            message: "Invalid mission id",
          },
        },
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

siteSchema.pre('remove', async function (next) {
  try {
    const user = await UserModel.findById(this.userId);
    user.sites.pull(this._id);
    user.save();

    await mongoose.model('Drone').updateMany({ siteId: this._id }, { $unset: { siteId: 1 } });

    // Remove siteId from user document
    // await mongoose.model('User').updateMany({ 'sites': this._id }, { $pull: { sites: this._id } });

    next();
  } catch (err) {
    next(err);
  }
});
const SiteModel = mongoose.model("Site", siteSchema);

module.exports = SiteModel;
