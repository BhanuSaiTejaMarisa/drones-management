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
droneSchema.pre("remove", async function (next) {
  //this refers to this particualr drones document
  const siteId = this.site;
  if (siteId) {
    try {
      const site = await mongoose.model("Site").findById(siteId);
      site.drones.pull(this._id);
      await site.save();
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

//another way
// droneSchema.pre("remove", async function () {
//   const drone = this;
//   try {
//     // find the site that contains this drone
//     const site = await Site.findOne({ drones: drone._id });

//     // remove the drone from the site's list of drones
//     site.drones.pull(drone._id);

//     // save the site
//     await site.save();
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//way 3
// DroneSchema.pre('findByIdAndDelete', async function () {
//   const drone = await this.model.findOne(this.getFilter()).populate('site');
//   if (drone.site) {
//     drone.site.drones.pull(this._id);
//     await drone.site.save();
//   }
// });
const DroneModel = mongoose.model("Drone", droneSchema);

module.exports = DroneModel;
