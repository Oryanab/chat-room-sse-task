import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SingleMessage from "./SingleMessage";

export default function Chatbox({ allMessages }) {
  return (
    <>
      <div>
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
