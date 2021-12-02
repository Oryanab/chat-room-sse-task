import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Chatbox from "./Chatbox";
import ConnectedUsers from "./ConnectedUsers";
import LoginForm from "./LoginForm";
import TypeMessage from "./TypeMessage";

function App() {
  return (
    <>
      <Router>
        <div id="welcome">
          <h1>Welcome to ChatBro</h1>
          <div>
            <Routes>
              <Route exact path="/" element={<LoginForm />} />
              <Route
                exact
                path="/chat"
                element={
                  <>
                    <Chatbox />
                    <ConnectedUsers />
                    <TypeMessage />
                  </>
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
