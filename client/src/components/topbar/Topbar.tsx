import "./topbar.css";
import { Link } from "react-router-dom";
import { BsSearch, BsFillPersonFill, BsFillChatLeftTextFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">$ocialism</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <BsSearch className="searchIcon" />
          <input
            placeholder="Search for friends or posts..."
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">NewsFeed</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <BsFillPersonFill className="topbarIcon"/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <BsFillChatLeftTextFill className="topbarIcon"/>
            <span className="topbarIconBadge">0</span>
          </div>
          <div className="topbarIconItem">
            <IoMdNotifications className="topbarIcon"/>
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <div>
          <Link to="/profile/user" style={{ textDecoration: "none" }}>
            <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000" alt="profile" className="topbarImage" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
