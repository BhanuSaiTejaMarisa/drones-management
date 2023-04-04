const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const UserModel = require("../models/userModel");
const sendEmail = require("../util/sendEmail");


async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      //use sendStatus to return response to client
      //if res.status is used next lines also will be exectued because 
      //it only sets status code in response object, it does not terminate 
      //the function or return response to the client
      res.sendStatus(409);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationString = uuid();

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
      verificationString
    });
    await result.save();
    const { _id: id } = result;
    try {

      await sendEmail({
        to: email,
        from: "bhanusaitejamarisa@gmail.com",
        subject: "Pleaseverify your email",
        text: `Thanks for signing up! To verify your email click here:
                      http://localhost:3000/verify-email/${verificationString}`
      })
    }
    catch (err) {
      res.status(500).json({ message: err.message + " something wrong with send mail" })
    }

    jwt.sign(
      {
        id,
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
      });

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}


async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);
    const newPassword = await bcrypt.hash(password, 10);

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
}

async function verifyEmail(req, res) {
  try {
    const { verificationString } = req.body;
    const user = await UserModel.findOne({ verificationString });

    if (!user) return res.status(401).json({ message: "The email verification code is incorrect!" })

    const { _id, email } = user;
    const updateduser = await UserModel.updateOne({ _id }, {
      isVerified: true
    })
    jwt.sign({ id: _id, isVerified: true, email }, process.env.JWT_SECRET, (err, token) => {
      if (err) res.sendStatus(500);
      res.status(200).json({ token })
    })
  }
  catch (error) {

  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.params;
    const passwordResetCode = uuid();
    const user = await UserModel.updateOne(
      { email },
      { passwordResetCode }
    );

    if (user.modifiedCount > 0) {
      try {
        await sendEmail({
          to: email,
          from: "bhanusaitejamarisa@gmail.com",
          subject: "Password reset",
          text: `
            To rest your password, click this link:
            http://localhost:3000/reset-password/${passwordResetCode}`
        })

      }
      catch (err) {
        res.sendStatus(500)
      }
    }
    res.sendStatus(200)
  }
  catch (error) {

  }
}

async function resetPassword(req, res) {
  try {
    const { passwordResetCode } = req.params;
    const { newPassword } = req.body;
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const user = await UserModel.findOneAndUpdate({ passwordResetCode }, { $set: { passwordHash: newPasswordHash }, $unset: { passwordResetCode: "" } })
    if (user) return res.sendStatus(404)
    res.sendStatus(200)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { signIn, logIn, verifyEmail, forgotPassword, resetPassword };