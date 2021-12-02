import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function TypeMessage({ username }) {
  const messageInput = useRef("");

  async function addMessageToChat(name, message) {
    await axios.post("http://localhost:8000/post", {
      username: name,
      message: message,
    });
    messageInput.current.value = "";
  }

  return (
    <div>
      <input ref={messageInput} id="input" type="text" />
      <button
        onClick={(e) => {
          e.preventDefault();
          addMessageToChat(username, messageInput.current.value);
        }}
        type="button"
        id="send"
      >
        send message
      </button>
    </div>
  );
}
