import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchUserPosts,
  SinglePostType,
  fetchFeed,
} from "../../redux/slices/PostSlice";
import { RootState } from "../../redux/store";

const Feed: React.FC = () => {
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );
  const feed = useSelector((state: RootState) => state.postReducer.posts.feed);
  const userPosts = useSelector(
    (state: RootState) => state.postReducer.posts.userPosts
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAllPosts = async () => {
      await dispatch(fetchUserPosts(usersData?._id));
      await dispatch(fetchFeed(usersData?._id));
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {}, [feed, userPosts]);

  console.log("feed updated");
  console.log(feed);
  // Фид не меняется потому что с бекенда в ответ на удаление поста приходят только юзерпостс
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {feed.map((post, i) => (
          <Post data={post} key={i} userpage={false} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
