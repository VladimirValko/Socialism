import React from "react";
import "./messenger.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Messages from "../../components/messages/Messages";
import ChatLeftbar from "../../components/chatRightbar/ChatRightbar";

const Messenger: React.FC = () => {
  const friends = useSelector(
    (state: RootState) => state.authReducer.userData.user?.followins
  );

  return (
    <>
      <Topbar />
      <div className="messengerPage">
        <Leftbar />
        <Messages />
        <ChatLeftbar />
      </div>
    </>
  );
};

export default Messenger;
