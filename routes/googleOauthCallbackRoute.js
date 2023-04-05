const jwt = require("jsonwebtoken");

const router = require("express").Router();
const getGoogleUser = require("../util/getGoogleUser");
const updateOrCreateUserFromOauth = require("../util/updateOrCreateUserFromOauth")
router.get("/", async (req, res) => {
  const { code } = req.query;

  const oauthUserInfo = await getGoogleUser({ code })
  const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });
  const { _id: id, isVerified, email, info } = updatedUser;
  jwt.sign({ id, isVerified, email, info },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) return res.sendStatus(500);

      res.redirect(`http://localhost:3000/login?token=${token}`)
    }
  )
})

module.exports = router