const getGoogleOauthUrl = require("../util/getGoogleOauthUrl");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const url = getGoogleOauthUrl();
    res.status(200).json({ url })
  }
  catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = router 