const jwt = require("jsonwebtoken");

const tokenAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).send({
      message: "please login to continue",
      error: "No token found",
      name: "Need to login",
    });
  } else {
    next();
  }
};

const sliceToken = (req) => {
  const headerToken = req.header("Authorization");
  const token = headerToken.slice(7);

  const userInfo = jwt.verify(token, process.env.JWT);

  return userInfo;
};

const adminCheck = async (req, res, next) => {
  const { username, isAdmin } = sliceToken(req);
  if (!isAdmin) {
    res.status(401).send({
      message: `${username} is not an admin.`,
      error: "Unathorized user",
      name: "NotAllowedUserError",
    });
  } else {
    next();
  }
};

module.exports = {
  tokenAuth,
  sliceToken,
  adminCheck,
};
