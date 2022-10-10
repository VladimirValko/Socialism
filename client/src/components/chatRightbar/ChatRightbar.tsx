import React from "react";
import "./chatRightbar.css";
import Conversation from "../conversations/Conversation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatLeftbar = () => {
  const friends = useSelector(
    (state: RootState) => state.authReducer.userData.user?.followins
  );

  return (
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        <span className="friendsTitle">Chats with Friends</span>
        {friends?.map((friend) => (
          <Conversation user={friend} />
        ))}
      </div>
    </div>
  );
};

export default ChatLeftbar;
