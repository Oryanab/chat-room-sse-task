import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatPage({ username, connectedUsers }) {
  const [allMessages, setAllMessages] = useState([]);
  const [causeRender, setCauseRender] = useState(null);

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000");
    eventSource.addEventListener("message", function (event) {
      updateMessages(JSON.parse(event.data));
    });

    //eventSource.onerror = () => {
    //   console.log("server Closed Connection");
    //   eventSource.close();
    // };
  }, [causeRender]);

  useEffect(() => {}, [causeRender]);

  const updateMessages = (messages) => {
    setAllMessages([...messages]);
  };

  return (
    <>
      <Chatbox allMessages={allMessages} username={username} />
      <ConnectedUsers connectedUsers={connectedUsers} />
      <TypeMessage setCauseRender={setCauseRender} username={username} />
    </>
  );
}
