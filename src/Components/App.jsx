import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import LoginForm from "./LoginForm";
import ChatPage from "./ChatPage";

function App() {
  const [auth, IsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [refreshChat, setRefreshChat] = useState("");

  return (
    <>
      <Router>
        <div id="welcome" style={{ textAlign: "center" }}>
          <h1>Welcome to ChatBro</h1>
          <div className="main-div">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  auth ? (
                    <ChatPage
                      auth={auth}
                      IsAuth={IsAuth}
                      username={username}
                      refreshChat={refreshChat}
                      //connectedUsers={connectedUsers}
                    />
                  ) : (
                    <LoginForm
                      auth={auth}
                      IsAuth={IsAuth}
                      setUsername={setUsername}
                      setRefreshChat={setRefreshChat}
                      // setConnectedUsers={setConnectedUsers}
                      // connectedUsers={connectedUsers}
                    />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
