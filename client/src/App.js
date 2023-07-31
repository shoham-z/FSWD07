import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Messenger from "./pages/Messenger";
import NewChats from "./pages/NewChats";
import ImageUploader from "./pages/ImageUploader";

import { createContext, useState } from "react";
import Register from "./pages/Register";

const CurrentUserContext = createContext(null);

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [chosenChat, setChosenChat] = useState(null);
  const [newChat, setNewChat] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const [settings, setSettings] = useState(false);
  const [newContact, setNewContact] = useState(false);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        currentUsername,
        setCurrentUsername,
      }}
    >
      {/* <BrowserRouter>
        <Routes>
          {isLoged ? (
              <Route element={<Layout />}>
              <Route path = "register" element={<Register />} />
              <Route path="*" element={<NoPage />} />
              <Route path="messenger/" element={<Messenger chatData = {chatData} />} />
            </Route>
          ) : (
            <Route index element={<Login handleLogin={handleLogin} />} />
            )}
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<Layout newContact = {newContact}
                                  setNewContact = {setNewContact}
                                  setNewChat = {setNewChat}
                                  newChat = {newChat}
                                  setSettings = {setSettings}
                                  settings = {settings}
                                  setNewGroup = {setNewGroup}
                                  newGroup = {newGroup} />}>
            <Route path="/messenger" element={<Messenger setNewContact = {setNewContact}
                                                         setChosenChat={setChosenChat}
                                                         chosenChat = {chosenChat}
                                                         newChat = {newChat}
                                                         newGroup = {newGroup}
                                                         setNewGroup = {setNewGroup}
                                                         settings = {settings}
                                                         setNewChat = {setNewChat}/>}/>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

const exp = { App, CurrentUserContext };
export default exp;
