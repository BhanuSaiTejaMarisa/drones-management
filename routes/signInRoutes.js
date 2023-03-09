const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("signin");
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      //use sendStatus to return response to client
      //if res.status is used next lines also will be exectued because 
      //it only sets status code in response object, it does not terminate 
      //the function or return response to the client
      res.sendStatus(409);
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };
    const result = new UserModel({
      email,
      passwordHash,
      //   info: startingInfo,
      isVerified: false,
    });
    await result.save();
    const { _id } = result;
    console.log(result, result.insertedId);
    jwt.sign(
      {
        _id,
        email,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);
    const newPassword = await bcrypt.hash(password, 10);

    console.log({ passwordHash, newPassword }, (newPassword == passwordHash))

    if (isCorrect) {
      jwt.sign({
        id, isVerified, email
      },
        process.env.JWT_SECRET,
        (error, token) => {
          if (error) {
            res.status(500).json(error);
          }
          res.status(200).json({ token })
        }
      )
    }
    else {
      res.sendStatus(401)
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }




});

module.exports = router;
