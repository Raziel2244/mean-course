const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "ntJSXNPYeSVojmFTtNxVG0CzBMQvn4cOe9nFck59KUOcVh7q5kZGKisq2vWaDleT");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed"
    });
  }
}
