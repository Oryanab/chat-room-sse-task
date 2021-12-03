import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatPage({ username, refreshChat }) {
  const [allMessages, setAllMessages] = useState([]);
  const [causeRender, setCauseRender] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  async function getUsers() {
    axios.get("http://localhost:8000/sse/getusers").then((result) => {
      setConnectedUsers(result.data);
    });
  }

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/sse");
    eventSource.onmessage = function (event) {
      updateMessages(JSON.parse(event.data));
    };
    axios.post("http://localhost:8000/sse/user", {
      username: localStorage.getItem("username"),
    });
    getUsers();
  }, [causeRender]);

  useEffect(() => {
    getUsers();
  }, [refreshChat]);

  useEffect(() => {}, [causeRender]);

  const updateMessages = (messages) => {
    setAllMessages([...messages]);
  };

  return (
    <>
      <div>
        <h3>hello {username}!</h3>
        <div className="chatbox-div">
          <Chatbox allMessages={allMessages} username={username} />
        </div>
        <div className="chatbox-users">
          <ConnectedUsers connectedUsers={connectedUsers} />
        </div>
        <TypeMessage setCauseRender={setCauseRender} username={username} />
      </div>
    </>
  );
}
