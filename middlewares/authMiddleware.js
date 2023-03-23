const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");


const authMiddleware = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "No authorization header sent" })
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

    if (err) res.status(401).json({ message: "Unable to verify token" });

    const { id } = decoded;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(403).json({ message: "unauthorized" })
    }
    next()
  })

}

module.exports = authMiddleware;