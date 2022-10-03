import User from "../models/User.js";
import bcrypt from "bcrypt";
// import

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: "wrong email or password",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
