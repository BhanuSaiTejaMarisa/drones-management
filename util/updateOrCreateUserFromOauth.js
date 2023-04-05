const UserModel = require("../models/userModel");

updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const {
    id: googleId,
    verified_email: isVerified,
    email,
  } = oauthUserInfo;

  const existingUser = await UserModel.findOne({ email })

  if (existingUser) {
    const result = await UserModel.findOneAndUpdate(
      { email },
      { $set: { googleId, isVerified } },
      { returnOriginal: false }
    )
    console.log({ updateUser: result });
    return result;
  }
  else {
    const result = new UserModel({
      email,
      googleId,
      isVerified,
      info: {}
    });
    await result.save()
    console.log({ updateNewuser: result });
    return result;
  }
}

module.exports = updateOrCreateUserFromOauth