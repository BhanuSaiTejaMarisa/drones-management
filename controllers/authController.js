const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const UserModel = require("../models/userModel");
const sendEmail = require("../util/sendEmail");
const { CognitoUserAttribute, CognitoUser, AuthenticationDetails } = require("amazon-cognito-identity-js");
const awsUserPool = require("../util/awsUserPool")

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email })
    ]

    awsUserPool.signUp(email, password, attributes, null, async (err, awsResult) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to signup user" })
      }
      const user = await UserModel.create({ email, isVerified: false });

      const { _id: id } = user;

      jwt.sign({
        id,
        email,
        isVerified: false
      },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d"
        },
        (err, token) => {
          if (err) res.sendStatus(500);
          res.status(200).json({ token })
        }
      )

    })
  }
  catch (err) {
    res.status(409).json({ error: err.message })
  }
}


async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async result => {

          const user = await UserModel.findOne({ email })

          const { _id: id, isVerified, } = user;

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

        },
        onFailure: err => {
          res.sendStatus(401)
        }
      }
    )

  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function verifyEmail(req, res) {
  try {
    const { email, verificationString } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool })
      .confirmRegistration(verificationString, true, async (err,) => {
        if (err) res.status(401).json({ message: "The email verification code is incorrect" })

        const updateduser = await UserModel.findOneAndUpdate({ email },
          { $set: { isVerified: true } },
          { returnOriginal: false })

        const { _id: id, } = updateduser;

        jwt.sign({ id, isVerified: true, email }, process.env.JWT_SECRET, (err, token) => {
          if (err) res.sendStatus(500);
          res.status(200).json({ token })
        })
      })

  }
  catch (error) {

  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.params;

    new CognitoUser({ Username: email, Pool: awsUserPool }).forgotPassword({
      onSuccess: () => {
        res.sendStatus(200)
      },
      onFailure: () => {
        res.sendStatus(500)
      }
    })
  }
  catch (error) {

  }
}

async function resetPassword(req, res) {
  try {
    const { passwordResetCode } = req.params;
    const { email,newPassword } = req.body;
   
    new CognitoUser({Username:email,Pool:awsUserPool})
    .confirmPassword(passwordResetCode,newPassword,{
      onSuccess:()=>{
        res.sendStatus(200)
      },
      onFailure:()=>{
        res.sendStatus(401)
      }
    })
  }
  catch (error) {
    // res.status(500).json({ message: error.message })
  }
}

module.exports = { signIn, logIn, verifyEmail, forgotPassword, resetPassword };