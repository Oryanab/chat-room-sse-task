import React from "react";

export default function SingleMessage({ message, username }) {
  return (
    <>
      <div>
        <div className="from-div">
          <p>{username}:</p>
          <p>{message}</p>
        </div>
        <h5>{new Date().toTimeString().split(" ")[0]}</h5>
      </div>
    </>
  );
}
