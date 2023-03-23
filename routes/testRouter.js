const express = require("express");
const Model = require("../models/model.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");
//Post method
router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = new Model({
      name: req.body.name,
      age: req.body.age,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/token", (req, res) => {
  const accessToken = jwt.sign(
    {
      user: "Bhanu",
    },
    process.env.ACCESS_KEY,
    { expiresIn: "35s" }
  );
  res.json({ accessToken });
});

router.get("/token", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) res.status(401);

    jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
      if (err) res.status(403);
      res.json(user);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
