import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchAllPosts } from "../../redux/slices/PostSlice";
import { fetchAllUsers } from "../../redux/slices/UserSlice";
import { RootState } from "../../redux/store";
import { getFeedFromAllPosts } from "../../utils/getFeedFromAllPosts";
import { SinglePostType } from "../../redux/slices/PostSlice";
import { fetchGetUserVideos } from "../../redux/slices/VideosSlice";
import { fetchCreateUserVideos } from "../../redux/slices/VideosSlice";

const Feed: React.FC = () => {
  const [feed, setFeed] = useState<SinglePostType[]>([]);
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );
  const userVideosData = useSelector(
    (state: RootState) => state.videosReducer.userVideos
  );
  const allPosts = useSelector((state: RootState) => state.postReducer.posts);
  const dispatch = useDispatch<AppDispatch>();
  const userId = usersData?._id;

  // const videosState = useSelector((state: RootState) => state.videosReducer);

  useEffect(() => {
    const newUserVideos = {
      userId,
    };

    const getData = async () => {
      // await dispatch(fetchFeed(usersData?._id));
      await dispatch(fetchAllPosts());
      await dispatch(fetchAllUsers());
      await dispatch(fetchGetUserVideos(userId));
      const setUserVideos = async () => {
        if (!userVideosData?._id) {
          await dispatch(fetchCreateUserVideos(newUserVideos));
        }
        setUserVideos();
      };
    };
    getData();
  }, []);

  useEffect(() => {
    const userFeed = getFeedFromAllPosts(
      allPosts,
      usersData?.followins,
      usersData?._id
    );
    setFeed(userFeed);
  }, [allPosts]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {feed?.map((post, i) => (
          <Post data={post} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
