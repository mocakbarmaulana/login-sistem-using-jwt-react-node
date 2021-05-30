const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if field not all fill
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please fill all fields" });

    const user = await UserModel.findOne({ email });
    // Check if email is already exists
    if (user) return res.status(400).json({ msg: "Email is already exists" });

    // Check length password must be more 6 characters.
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be more than 6 characters" });

    // hash password
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // make jwt
    const accesstoken = createAccessToken({ id: newUser._id });
    const refreshtoken = createRefreshToken({ id: newUser._id });

    // save to cookies
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ accesstoken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if field not all fill
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill all fields" });

    const user = await UserModel.findOne({ email });
    // check if email doesn't exists
    if (!user)
      return res
        .status(400)
        .json({ msg: "Email doesn't exists, please register" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Check if password not match
    if (!isPasswordMatch)
      return res.status(400).json({ msg: "Password incorrect" });

    // make jwt
    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });

    // save to cookies
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ accesstoken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.refreshtoken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.infor = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User doesn't exists" });

    res.json({ user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.status(200).json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "7d" });
};
