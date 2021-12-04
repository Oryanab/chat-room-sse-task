import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import TypeMessage from "./TypeMessage";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const eventSource = new EventSource("http://localhost:8000/sse");

export default function ChatPage({ username, refreshChat }) {
  const [allMessages, setAllMessages] = useState([]);
  const [causeRender, setCauseRender] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  // async function getUsers() {
  //   const result = await axios.get("http://localhost:8000/sse/getusers");
  //   setConnectedUsers(result.data);
  // }

  useEffect(async () => {
    eventSource.onmessage = function (event) {
      updateMessages(JSON.parse(event.data));
    };
    axios.post("http://localhost:8000/sse/user", {
      username: localStorage.getItem("username"),
    });

    axios.get("http://localhost:8000/sse/getusers").then((users) => {
      setConnectedUsers(users.data);
      console.log(users.data);
    });
  }, [causeRender]);

  //useEffect(() => {}, [refreshChat]);

  useEffect(() => {}, [causeRender]);

  const updateMessages = (messages) => {
    setAllMessages([...messages]);
  };

  const updateUsers = (users) => {
    setConnectedUsers([...users]);
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
