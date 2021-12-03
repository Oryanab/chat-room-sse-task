import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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
      connectedUsers.push(usernameInput.current.value);
      axios
        .post("http://localhost:8000/user", {
          username: usernameInput.current.value,
        })
        .then((reuslt) => {
          setConnectedUsers(reuslt.data);
        });
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
