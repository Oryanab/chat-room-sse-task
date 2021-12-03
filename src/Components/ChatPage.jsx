import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";

export default function ChatPage({ username, connectedUsers }) {
  const [allMessages, setAllMessages] = useState([]);
  return (
    <>
      <Chatbox
        setAllMessages={setAllMessages}
        allMessages={allMessages}
        username={username}
      />
      <ConnectedUsers connectedUsers={connectedUsers} />
      <TypeMessage username={username} />
    </>
  );
}
