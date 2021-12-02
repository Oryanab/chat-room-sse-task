import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";

export default function ChatPage({
  username,
  connectedUsers,
  allMessages,
  setAllMessages,
}) {
  return (
    <>
      <Chatbox
        allMessages={allMessages}
        setAllMessages={setAllMessages}
        username={username}
      />
      <ConnectedUsers connectedUsers={connectedUsers} />
      <TypeMessage username={username} />
    </>
  );
}
