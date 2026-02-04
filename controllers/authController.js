import users from "../models/UserModel.js";
import genToken from "../config/genToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let existUser = await users.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User is already Exist" });
    }
    const user = await users.create({
      name: username,
      email,
      password,
    });
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user || user.password !== password) {
      return res
        .status(404)
        .json({ message: "User not found or incorrect password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ message: "Login Successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    console.log(req.cookies);
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await users.findById({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
};
