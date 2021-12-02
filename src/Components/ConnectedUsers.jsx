import React, { useEffect, useState, useRef } from "react";

export default function ConnectedUsers({ connectedUsers }) {
  return (
    <>
      {connectedUsers.map((name) => {
        return <h3>{name}</h3>;
      })}
    </>
  );
}
