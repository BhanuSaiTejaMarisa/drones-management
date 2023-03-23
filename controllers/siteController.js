const DroneModel = require("../models/droneModel.js");
const UserModel = require("../models/userModel.js");
const SiteModel = require("../models/siteModel.js");
const ObjectId = require('mongoose').Types.ObjectId;

async function addSite(req, res) {
  try {
    const userId = req.query.userId;
    const data = req.body;
    const site = new SiteModel({ ...data, userId });
    await site.save();

    //approach 1
    // const options = { new: true };
    // const updatedUserData = await UserModel.findByIdAndUpdate(
    //   userId,
    //   { $push: { sites: site._id } },
    //   options
    // );

    //approach 2
    const user = await UserModel.findById(userId);
    user.sites.push(site._id);
    await user.save();
    res.status(200).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getSite(req, res) {
  try {
    const id = req.params.id;
    const data = await SiteModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getSitesByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const data = await UserModel.findById(userId).populate("sites");

    res.status(200).json(data.sites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllSites(req, res) {
  try {
    const Sites = await SiteModel.find();
    res.status(200).json(Sites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function addDroneToSite(req, res) {
  try {
    const siteId = req.params.id;
    const droneId = req.body.droneId;
    const site = await SiteModel.findById(siteId);

    const alreadyExists = site.drones.some(drone => {
      const id = ObjectId(drone).toString();

      return id === droneId
    });
    if (alreadyExists) {
      res.status(200).json({ message: "drone aleady exists in the site" })
    }

    const drone = await DroneModel.findById(droneId);

    const existingSiteId = ObjectId(drone.siteId).toString()

    const existingSite = await SiteModel.findByIdAndUpdate(existingSiteId, {
      $pull: { drones: droneId }
    })
    const options = { new: true };
    const updatedSite = await SiteModel.findByIdAndUpdate(
      siteId,
      { $push: { drones: droneId } },
      options
    );
    const updatedDrone = await DroneModel.findByIdAndUpdate(
      droneId,
      {
        siteId,
      },
      options
    );
    res.status(200).json(updatedSite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteSite(req, res) {
  try {
    const siteId = req.params.id;
    console.log("deleteing site");
    const deletedSite = await SiteModel.findById(siteId);
    deletedSite.remove();
    res.status(200).json(deletedSite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// async function getSitesByUserId(req, res) {
//   try {
//     const userId = req.query.userId;
//     await UserModel.findById(userId)
//       .populate("sites")
//       .exec((err, user) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         return res.status(200).json(user.Sites);
//       });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

async function deleteDroneToSite(req, res) {
  try {
    const siteId = req.params.id;
    const droneId = req.body.droneId;
    const options = { new: true };
    // const updatedSite = await SiteModel.findByIdAndUpdate(
    //   siteId,
    //   { $pull: { drones: droneId } },
    //   options
    // );
    const site = await SiteModel.findById(siteId);
    site.drones.pull(droneId);
    site.save();
    // const updatedDrone = await DroneModel.findByIdAndUpdate(
    //   droneId,
    //   {
    //     siteId: null,//use $unset to remove field
    //   },
    //   options
    // );
    res.status(200).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  addSite,
  addDroneToSite,
  //   updateSite,
  getSite,
  getAllSites,
  getSitesByUserId,
  deleteSite,
  deleteDroneToSite,
};
