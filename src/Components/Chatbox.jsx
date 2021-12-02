import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SingleMessage from "./SingleMessage";

export default function Chatbox({ username, allMessages, setAllMessages }) {
  const messageBoxDiv = useRef(null);
  const eventSource = new EventSource("http://localhost:8000/");

  eventSource.onmessage = function (event) {
    //document.getElementById("messages").innerHTML = "";
    console.log(event.data);
    setAllMessages(event.data);
  };

  return (
    <>
      <div>
        <h3>hello {username}!</h3>
        <div id="messages">
          {allMessages.forEach((msg) => {
            return (
              <p>msg.message</p>
              //   <SingleMessage message={msg.message} username={msg.username} />
            );
          })}
        </div>
      </div>
    </>
  );
}
