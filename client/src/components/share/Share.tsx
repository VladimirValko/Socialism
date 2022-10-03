import "./share.css";
import Person1 from "../../assets/person/1.jpeg";
import { BsImages } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { RiFileMusicLine } from "react-icons/ri";

const Share = () => {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={Person1} alt="profile" />
          <input placeholder="What's new?..." className="shareInput" />
        </div>
        <hr className="shareHR" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <BsImages className="shareIcon" style={{ color: "#0e8bad" }} />
              <span className="shareOptionText">Photo / Video</span>
            </div>
            <div className="shareOption">
              <RiFileMusicLine className="shareIcon" style={{ color: "#600e8c" }} />
              <span className="shareOptionText">Music</span>
            </div>
            <div className="shareOption">
              <GoLocation className="shareIcon" style={{ color: "#b8261c" }}/>
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button className="shareBtn">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
