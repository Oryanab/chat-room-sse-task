import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SingleMessage from "./SingleMessage";

export default function Chatbox({ username, allMessages }) {
  //   const testlist = [
  //     { username: "oryan", message: "hello" },
  //     { username: "oryan", message: "hello" },
  //   ];
  return (
    <>
      <div>
        <h3>hello {username}!</h3>
        <div id="messages">
          {allMessages.map((msg) => {
            return (
              <SingleMessage message={msg.message} username={msg.username} />
            );
          })}
        </div>
      </div>
    </>
  );
}
