import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SingleMessage from "./SingleMessage";

export default function Chatbox({ username, allMessages }) {
  return (
    <>
      <div>
        <h3>hello {username}!</h3>
        <div id="messages">
          {allMessages.map((msg) => {
            return (
              <SingleMessage
                message={msg.message}
                username={msg.username}
                time={msg.time}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
