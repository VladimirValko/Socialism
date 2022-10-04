import User from "../models/User.js";

export const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      $set: req.body,
    });
    const updatedUser = await User.findById(req.params.userId);

    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, isAdmin, ...notPrivateInfo } = user._doc;

    if (!user) {
      res.status(403).json("No such user..");
    }

    res.status(200).json(notPrivateInfo);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const followUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    console.log(user);
    console.log(currentUser);

    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({
        $push: {
          followers: req.body.userId,
        },
      });
      await currentUser.updateOne({
        $push: {
          followins: req.params.id,
        },
      });
      res.status(200).json("You are following this user now!");
    } else {
      return res.status(403).json("You are alrady following this user");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    console.log(user);
    console.log(currentUser);

    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({
        $pull: {
          followers: req.body.userId,
        },
      });
      await currentUser.updateOne({
        $pull: {
          followins: req.params.id,
        },
      });
      res.status(200).json("You are not following this user now!");
    } else {
      return res.status(403).json("You are not following this user");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
