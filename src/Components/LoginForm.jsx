import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function LoginForm({ IsAuth, setUsername }) {
  const usernameInput = useRef("");
  if (localStorage.getItem("username")) {
    IsAuth(true);
    setUsername(localStorage.getItem("username"));
    axios.post("http://localhost:8000/sse/user", {
      username: localStorage.getItem("username"),
    });
  } else {
    IsAuth(false);
  }

  function checkUserName() {
    if (usernameInput.current.value.length > 0) {
      setUsername(usernameInput.current.value);
      axios.post("http://localhost:8000/sse/user", {
        username: usernameInput.current.value,
      });
      localStorage.setItem("username", usernameInput.current.value);
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
