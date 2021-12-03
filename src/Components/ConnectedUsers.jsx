import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ConnectedUsers({ connectedUsers }) {
  return (
    <>
      {connectedUsers.map((name) => {
        return <h5 key={name}>{name}</h5>;
      })}
    </>
  );
}
