import "./leftbar.css";
import { MdRssFeed, MdVideoLibrary } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { SiYoutubemusic, SiTinder } from "react-icons/si";
import { BiNews } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import Birthday from "../../assets/gift.png";

const Sidebar: React.FC = () => {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <MdRssFeed className="leftbarListItemIcon" />
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="leftbarListItemText link">Feed</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <FaUserFriends className="leftbarListItemIcon" />
            <Link to="/users" style={{ textDecoration: "none" }}>
              <span className="leftbarListItemText link">People</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <BsFillChatLeftTextFill className="leftbarListItemIcon" />
            <span className="leftbarListItemText">Chats</span>
          </li>
          <li className="leftbarListItem">
            <MdVideoLibrary className="leftbarListItemIcon" />
            <span className="leftbarListItemText">Videos</span>
          </li>
          <li className="leftbarListItem">
            <SiYoutubemusic className="leftbarListItemIcon" />
            <span className="leftbarListItemText">Music</span>
          </li>
          <li className="leftbarListItem">
            <BiNews className="leftbarListItemIcon" />
            <span className="leftbarListItemText">News</span>
          </li>
          <li className="leftbarListItem">
            <SiTinder className="leftbarListItemIcon" />
            <span className="leftbarListItemText">Finder</span>
          </li>
        </ul>
        <div className="premiumBtn">
          <button className="leftbarBtn">Try Premium</button>
        </div>
        <hr className="leftbarHR" />
        <div className="birthdayContainer">
          <img src={Birthday} alt="birthday" className="birthdayImg" />
          <span className="birthdayText">
            <b>Mister Anderson</b> and <b>3 others</b> have a birthday today
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
