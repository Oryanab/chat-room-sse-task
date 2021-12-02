import React, { useEffect, useState, useRef } from "react";

export default function LoginForm({
  auth,
  IsAuth,
  setUsername,
  setConnectedUsers,
  connectedUsers,
}) {
  const usernameInput = useRef("");
  function checkUserName() {
    if (usernameInput.current.value.length > 0) {
      setUsername(usernameInput.current.value);
      setConnectedUsers([...connectedUsers, usernameInput.current.value]);
      IsAuth(true);
    } else {
      alert("gotta enter stuff");
    }
  }

  return (
    <>
      <div>
        <label>Enter your username:</label>
        <br />
        <input ref={usernameInput} type="text" />
        <button onClick={() => checkUserName()}>Click To Chat</button>
      </div>
    </>
  );
}
