const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; 

    console.log("Token received:", token);

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      console.log("Token is valid:", decoded);

      res.status(200).json({ message: "Token is valid", decoded });
    });
  } catch (error) {
    console.error("Error while checking token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createToken, verifyToken };
