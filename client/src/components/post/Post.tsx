import "./post.css";
import Person1 from "../../assets/person/1.jpeg";
import { FiMoreVertical } from "react-icons/fi"
import PostPicture from "../../assets/post/1.jpeg";
import Like from "../../assets/like.png";
import Heart from "../../assets/heart.png";
// import { format } from "timeago.js";

export type PostData = {
  createdAt: string;
  desription: string;
  image: string;
  coment: number;
  likes: string[];
  userId: string;
}

type PostProps = {
  data: PostData
};

const Post:React.FC<PostProps> = ({ data }) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="PostProfileImg" src={Person1} alt="profile" />
            <span className="postUserName">Jane Smith</span>
            {/* <span className="postDate">{format(data?.createdAt) || ""}</span> */}
          </div>
          <div className="postTopRight">
            <FiMoreVertical />
          </div>
        </div>
        <div className="postBody">
          <span className="postText">{data?.desription || ""}</span>
          <img className="postImg" src={data?.image || ""} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={Like} alt="like" />
            <img className="likeIcon" src={Heart} alt="heart" />
            <span className="postLikeCounter">
              {data?.likes.length} people liked this
            </span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{data?.coment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
