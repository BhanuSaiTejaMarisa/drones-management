const DroneModel = require("../models/droneModel.js");
const UserModel = require("../models/userModel.js");
const SiteModel = require("../models/siteModel.js");

async function addSite(req, res) {
  try {
    const userId = req.query.userId;
    const data = req.body;
    const site = new SiteModel({ ...data, user_id: userId });
    await site.save();
    const options = { new: true };

    //approach 1
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
    const userId = req.query.userId;
    const data = await UserModel.findById(userId).populate("    ");
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
    const droneId = req.body.drone_id;
    const options = { new: true };
    const updatedSite = await SiteModel.findByIdAndUpdate(
      siteId,
      { $push: { drones: droneId } },
      options
    );
    const updatedDrone = await DroneModel.findByIdAndUpdate(
      droneId,
      {
        site_id: siteId,
      },
      options
    );
    res.status(200).json(updatedSite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// async function deleteSite(req, res) {
//   try {
//     const SiteId = req.params.id;
//     const deletedSite = await SiteModel.findByIdAndDelete(SiteId);
//     res.status(200).json(deletedSite);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// async function getSitesByUserId(req, res) {
//   try {
//     const user_id = req.query.userId;
//     await UserModel.findById(user_id)
//       .populate("Sites")
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
    const droneId = req.body.drone_id;
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
    //     site_id: null,
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
  //   deleteSite,
  deleteDroneToSite,
};
