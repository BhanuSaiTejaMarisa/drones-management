const { CognitoUserPool } = require("amazon-cognito-identity-js");

const { CognitoIdentityCredentials } = require("aws-sdk");
const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID
});

const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID
}


const awsUserPool = new CognitoUserPool(poolData);

module.exports = awsUserPool