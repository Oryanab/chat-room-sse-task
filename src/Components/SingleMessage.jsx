import React from "react";

export default function SingleMessage({ message, username, time }) {
  return (
    <>
      <div>
        <div className="from-div">
          <p>{username}:</p>
          <p>{message}</p>
          <p>{time}</p>
        </div>
      </div>
    </>
  );
}
