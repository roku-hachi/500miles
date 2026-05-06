const { PrismaClient } = require("../generated/client");
const { checkEmail } = require("../services/userService");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const { validateEmail } = require("../utils/validate");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json("No refresh token");
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
      id: decoded.id,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json("Invalid refresh token");
  }
};

const register = async (req, res) => {
  try {
    const data = req.body;
    if (!validateEmail(data.email)) {
      return res.status(400).json({
        field: "email",
        message: "This email is invalid.",
      });
    }
    const existingUser = await checkEmail(data.email);
    if (existingUser) {
      return res.status(400).json({
        field: "email",
        message: "This email already exists.",
      });
    }
    if (req.file) {
      data.avatar = req.file.path;
    }
    data.password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({ data });
    res.status(200).json({
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    if (!validateEmail(data.email)) {
      return res.status(400).json({
        field: "email",
        message: "This email is invalid.",
      });
    }
    const user = await checkEmail(data.email);
    if (!user) {
      return res.status(400).json({
        field: "email",
        message: "Incorrect or non-existent email address.",
      });
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        field: "password",
        message: "Incorrect password.",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
      message: "Login successful.",
      accessToken: accessToken,
      refreshToken: refreshToken,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  refreshToken,
  register,
  login,
};
