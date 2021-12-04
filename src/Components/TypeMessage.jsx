import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function TypeMessage({ username, setCauseRender }) {
  const messageInput = useRef("");

  async function addMessageToChat(name, message) {
    try {
      await axios.post("http://localhost:8000/sse/post", {
        username: name,
        message: message,
      });
    } catch (err) {
      console.log(err);
    }
    setCauseRender(messageInput.current.value);

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
