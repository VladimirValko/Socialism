import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import * as AuthControllers from "./controllers/authController.js";
import * as UserControllers from "./controllers/userController.js";
import * as PostControllers from "./controllers/postController.js";
import loginValidation from "./auth/authValidation.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:12345@cluster0.hdss6hs.mongodb.net/socialapp?retryWrites=true&w=majority"
    );
    console.log("DB is Alive");
  } catch (error) {
    console.log("NO connection to DB");
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

//ROUTS
app.get("/user/:id", UserControllers.getUser);
app.post("/register", AuthControllers.register);
app.post("/login", AuthControllers.login);
app.put("/users/:userId", UserControllers.update);

app.put("/user/:id/follow", UserControllers.followUser);
app.put("/user/:id/unfollow", UserControllers.unfollowUser);

app.get("/post/:id", PostControllers.getPost);
app.post("/post", PostControllers.createPost);
app.put("/post/:id", PostControllers.updatePost);
app.delete("/post", PostControllers.deletePost);
app.put("/post/:id/like", PostControllers.likePost);
app.get("/newsfeed/:userId", PostControllers.getNewsFeed);
app.post("/:userId/posts", PostControllers.getAllUserPosts);

app.listen(8888, () => {
  connect();
  console.log("app is alive on port 8888");
});
