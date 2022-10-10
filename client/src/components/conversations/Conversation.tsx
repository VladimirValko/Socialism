import React from "react";
import "./conversation.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type ConversationProps = {
  user: string;
};

const Conversation: React.FC<ConversationProps> = ({ user }) => {
  const allUsers = useSelector((state: RootState) => state.userReducer.users);
  const friend = allUsers.filter((person) => person._id === user)[0];

  return (
    <div className="conversation">
      <img src={friend.coverPicture} alt="" className="conversationImg" />
      <span className="conversationName">{friend.username}</span>
    </div>
  );
};

export default Conversation;
