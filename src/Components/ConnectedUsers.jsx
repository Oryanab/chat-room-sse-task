import React, { useEffect, useState, useRef } from "react";

export default function ConnectedUsers({
  connectedUsers,
  setCauseContactsRender,
}) {
  setCauseContactsRender(connectedUsers);
  return (
    <>
      {connectedUsers.map((name) => {
        return <h5 key={name}>{name}</h5>;
      })}
    </>
  );
}
