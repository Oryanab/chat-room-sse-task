import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatPage({ username, connectedUsers }) {
  const [allMessages, setAllMessages] = useState([]);
  const [causeRender, setCauseRender] = useState(null);
  const [causeContactsRender, setCauseContactsRender] = useState(null);

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000");
    eventSource.onmessage = function (event) {
      updateMessages(JSON.parse(event.data));
    };
  }, [causeRender]);

  useEffect(() => {}, [causeRender]);
  useEffect(() => {}, [causeContactsRender]);

  const updateMessages = (messages) => {
    setAllMessages([...messages]);
    setCauseRender(causeRender);
  };

  return (
    <>
      <Chatbox allMessages={allMessages} username={username} />
      <ConnectedUsers
        setCauseContactsRender={setCauseContactsRender}
        connectedUsers={connectedUsers}
      />
      <TypeMessage setCauseRender={setCauseRender} username={username} />
    </>
  );
}
