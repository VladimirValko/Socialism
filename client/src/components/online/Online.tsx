import "./online.css";
import { FakeUser } from "../rightbar/Rightbar"

type OnlineData = {
  data: FakeUser;
}

const Online:React.FC<OnlineData> = ({ data }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={data.profilePicture} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span>{data.username}</span>
    </li>
  );
};

export default Online;
