/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function MessageSelf({ props }) {
  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p>{props.content}</p>
        {/* <p className="self-timeStamp">12:00am</p> */}
      </div>
    </div>
  );
}

export default MessageSelf;
