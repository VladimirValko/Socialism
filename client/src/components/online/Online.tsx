import "./online.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type OnlineData = {
  data: string;
};

const Online: React.FC<OnlineData> = ({ data }) => {
  const allUsers = useSelector((state: RootState) => state.userReducer.users);
  const friend = allUsers.filter((user) => user._id === data)[0];

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={friend.coverPicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span>{friend.username}</span>
    </li>
  );
};

export default Online;
