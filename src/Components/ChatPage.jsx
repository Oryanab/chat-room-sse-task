import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export default function ChatPage({ username }) {
  const [allMessages, setAllMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [causeRender, setCauseRender] = useState(null);

  useEffect(() => {
    const eventSourceMessages = new EventSourcePolyfill(
      "http://localhost:8000/sse",
      {
        headers: {
          username: localStorage.getItem("username"),
        },
      }
    );
    eventSourceMessages.onmessage = function (event) {
      setAllMessages(JSON.parse(event.data).messages);
      setConnectedUsers(JSON.parse(event.data).connected);
    };
  }, [causeRender]);

  return (
    <>
      <div>
        <h3>hello {username}!</h3>
        <div className="chatbox-div">
          <Chatbox allMessages={allMessages} />
        </div>
        <div className="chatbox-users">
          <ConnectedUsers connectedUsers={connectedUsers} />
        </div>
        <TypeMessage setCauseRender={setCauseRender} username={username} />
      </div>
    </>
  );
}
