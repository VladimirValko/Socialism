import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { PostData } from "../post/Post";


const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const { data } = await axios.get<PostData[]>(
        "http://localhost:8888/newsfeed/633985ce9dd5cbabfd730733"
      );
      setPosts(data);
      console.log(data);
    };

    fetchFeed();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts?.map((post, i) => (
          <Post data={post} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
