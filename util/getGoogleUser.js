const axios = require("axios");
const oauthClient = require("./oauthClient")

const getAccessAndBearerTokenUrl = ({ accessToken }) => {
  return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
}

const getGoogleUser = async ({ code }) => {
  // console.warn({ code })
  const { tokens } = await oauthClient.getToken(code);
  // console.log({ tokens })
  const response = await axios.get(
    getAccessAndBearerTokenUrl({
      accessToken: tokens.access_token
    }),
    { headers: { Authorization: `Bearer ${tokens.id_token}` } }
  )
  // console.log({ response });
  return response.data;
}

module.exports = getGoogleUser