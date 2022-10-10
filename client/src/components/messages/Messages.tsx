import React from "react";
import OneMessage from "../oneMessage/OneMessage";
import "./messages.css";

const Messages: React.FC = () => {
  return (
    <div className="messeges">
      <div className="messgesWrapper">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <OneMessage own={true} />
              <OneMessage own={false} />
              <OneMessage own={true} />
              <OneMessage own={false} />
              <OneMessage own={true} />
              <OneMessage own={false} />
              <OneMessage own={false} />
            </div>
          </div>
        </div>
        <div className="chatBoxBottom">
          <textarea
            placeholder="Wright your message..."
            className="chatInput"
          ></textarea>
          <button className="chatSubmitBtn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
