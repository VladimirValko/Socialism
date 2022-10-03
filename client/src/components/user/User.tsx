import "./user.css";
import Person1 from "../../assets/person/1.jpeg";
import Share from "../share/Share";
import Post from "../post/Post";
import PostImg from "../../assets/post/3.jpeg";
import { logOut } from "../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostData = {
  id: 1,
  desc: "Love For All, Hatred For None.",
  photo: PostImg,
  date: "5 mins ago",
  userId: 1,
  like: 32,
  comment: 9,
};

const User: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm("You are shure you want to logout?")) {
      dispatch(logOut());
      navigate("/login", { replace: true });
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className="user">
      <div className="userLeft">
        <div className="profileImg">
          <img src={Person1} alt="" />
        </div>
        <div className="profileMedia"></div>
      </div>
      <div className="userRight">
        <div className="profileInfo">
          <div className="nameLogout">
            <div className="userName">
              <span>Jane Smith</span>
            </div>
            <button className="logoutBtn" onClick={() => onClickLogout()}>
              Log out
            </button>
          </div>
          <div className="mainInfo">
            <span>
              Relationship: <b>Single</b>
            </span>

            <span className="birthday">
              Birthday <b>10.03.2001</b>
            </span>

            <span>
              My hometown is <b>London</b>
            </span>
          </div>
          <div className="dexcriptionContainer">
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
              sint dicta ab ducimus voluptatum architecto quaerat, id labore
              laudantium eum assumenda vero adipisci dolorem delectus
              repudiandae quidem nobis quod voluptate, id labore laudantium eum
              assumenda vero adipisci dolorem delectus repudiandae quidem nobis
              quod voluptate.
            </span>
          </div>
        </div>
        <div className="share">
          <Share />
        </div>
        {/* <Post data={PostData} />/ */}
        {/* {Posts.map((post) => (
          <Post data={post} key={post.id} />
        ))} */}
      </div>
    </div>
  );
};

export default User;
