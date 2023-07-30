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
  const [chosenContact, setChosenContact] = useState(null);
  const [newChat, setNewChat] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const [settings, setSettings] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const chatData = [
    {
      id: 1,
      name: "Chat 1",
      lastMessage: "Hey, how are you?",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 2,
      name: "Chat 2",
      lastMessage: "What's up?",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 3,
      name: "Chat 3",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 4,
      name: "Chat 4",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 5,
      name: "Chat 5 1",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 6,
      name: "Chat 6",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 7,
      name: "Chat 7",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
  ];

  const notChosen = {
    id: ' ',
    name: " ",
    lastMessage: " ",
    image:
      " ",
  }
 
  const contacts = [
    {
      id: 1,
      name: "Chat 1",
      lastMessage: "Hey, how are you?",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 2,
      name: "Chat 2",
      lastMessage: "What's up?",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 3,
      name: "Chat 3",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 4,
      name: "Chat 4",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 5,
      name: "Chat 5 1",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 6,
      name: "Chat 6",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
    {
      id: 7,
      name: "Chat 7",
      lastMessage: "Let's catch up!",
      image:
        "https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg",
    },
  ];
  let chosenOne  = contacts[chosenContact]||notChosen
  console.log(chosenOne)
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
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/ImageUploader" element={<ImageUploader />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route element={<Layout chosenChat={chatData[chosenChat  - 1]} newContact = {newContact}  setNewContact = {setNewContact} chosenContact={chosenOne} setNewChat = {setNewChat} newChat = {newChat} setSettings = {setSettings} settings = {settings} setNewGroup = {setNewGroup} newGroup = {newGroup} />}>
            <Route path="/messenger" element={<Messenger contacts={contacts} setNewContact = {setNewContact} chatData={chatData} setChosenChat={setChosenChat} chosenChat = {chosenChat}  newChat = {newChat} newGroup = {newGroup} setNewGroup = {setNewGroup} settings = {settings} setChosenContact = {setChosenContact} setNewChat = {setNewChat}/>}/>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

const exp = { App, CurrentUserContext };
export default exp;
