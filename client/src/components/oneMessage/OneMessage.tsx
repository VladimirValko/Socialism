import React from "react";
import "./oneMessage.css";
import Photo from "../../assets/person/1.jpeg";

type OneMessageProps = {
  own: boolean;
};

const OneMessage: React.FC<OneMessageProps> = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={Photo} alt="user" className="messageImg" />
        <p className="messageText">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
          maxime error aut, velit recusandae dicta culpa dolores qui dolorum
          corporis at numquam debitis vel aperiam ipsa molestias veritatis
          obcaecati amet!
        </p>
      </div>
      <div className="messageBottom">
        <span>1 hour ago</span>
      </div>
    </div>
  );
};

export default OneMessage;
