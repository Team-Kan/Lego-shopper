const jwt = require("jsonwebtoken");

const tokenAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).send({
      message: "please login to continue",
      error: "No token found",
      name: "Need to login",
    });
  }
  next();
};

const sliceToken = (req) => {
  const headerToken = req.header("Authorization");
  const token = headerToken.slice(7);

  const userInfo = jwt.verify(token, process.env.JWT_SECRET);

  return userInfo;
};

module.exports = {
  tokenAuth,
  sliceToken,
};
