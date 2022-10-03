import "./userPage.css";
import React from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Topbar from "../../components/topbar/Topbar";
import User from "../../components/user/User";

const UserPage:React.FC = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileContainer">
          <User />
        </div>
      </div>
    </>
  );
};

export default UserPage;
