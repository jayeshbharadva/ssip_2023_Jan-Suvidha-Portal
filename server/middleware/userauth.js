const jwt = require("jsonwebtoken");
const validateToken = async function (req, res, next) {
  let token;
  let authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    console.log(authHeader);
    token = authHeader.split(" ")[1];

    if (token === undefined) {
      return res.status(404).json({
        msg: "Token is undefined",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      const role = decoded.role;
      if (role != "user") {
        res.status(401).json({
          success: false,
          message: "You are not Authorized this link.",
        });
      }
      res.user = decoded;
      console.log(res.user);
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired");
        return res.status(401).json({
          msg: "Token has expired",
        });
      } else {
        console.log(err);
        return res.status(500).json({
          msg: "Internal Server Error",
        });
      }
    }
  } else {
    return res.status(401).json({
      msg: "Authorization header not found",
    });
  }
};

module.exports = validateToken;
