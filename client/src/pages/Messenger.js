import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import NewChats from "./NewChats";
import NewGroup from "./NewGroup";
import Settings from "./Settings";
import "../styles/Messenger.css";
import { FaSearch } from "react-icons/fa";

const Messenger = ({ chatData, setChosenChat, newChat, settings, newGroup, contacts, setNewGroup, setNewChat }) => {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const [filteredChatData, setFilteredChatData] = useState(chatData);
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Replace this with your code to fetch the last 10 messages for the selected chat
    // For example, you can get it from an API based on the selected chat ID
    // For now, I'm just using a dummy data array as an example
    const dummyMessages = [
      { id: 1, text: "Message 1 lzjjhfsddhfolashpaoiruijpoajkgboaieupoviwenjgowehmvioiweojgnpkkhehjbgoiaenlkafbvpoifjvnklajjbgpanv lkfsjbghmvowepijn" },
      { id: 2, text: "Message 2" },
      { id: 3, text: "Message 3" },
      // Add more messages here
    ];

    setMessages(dummyMessages);
  }, [setChosenChat]); // Fetch messages when the selected chat changes

  const handleSearch = (event) => {
    const value = event.target.value;

    // Filter the chat data based on the input value
    const filteredChats = chatData.filter((chat) =>
      chat.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredChatData(filteredChats);
  };

  const handleChatClick = (chatId) => {
    setChosenChat(chatId);
    
  };

  const handleScroll = () => {
    // Replace this with your code to fetch more messages when the user scrolls up
    // For now, I'm just using a dummy data array as an example
    const dummyMoreMessages = [
      { id: 4, text: "Message 4" },
      { id: 5, text: "Message 5" },
      { id: 6, text: "Message 6" },
      // Add more messages here
    ];

    // Simulate fetching more messages with a delay (you can remove this in the actual implementation)
    setTimeout(() => {
      setMessages((prevMessages) => [...dummyMoreMessages, ...prevMessages]);
    }, 1000);
  };

  const handelPage = () => {
    if (newChat) {
      return <NewChats contacts={contacts} setNewGroup = {setNewGroup} setNewChat = {setNewChat}/> 
    } else if(newGroup){
      return <NewGroup contacts={contacts} />
    }
    else{
      return <Settings/>
    }
  }

  return (
    <div className="container2">
      {(newChat || newGroup || settings) ? (
        // Render the appropriate page based on newChat, newGroup, and settings
        handelPage()
      ) : (
        <div className="left-section1">
          <nav className="search">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                onChange={handleSearch}
                type="text"
                className="search-input"
                placeholder="Search"
              />
            </div>
          </nav>
          <div className="chat-list-container">
            <ul className="chat-list">
              {filteredChatData.map((chat) => (
                <li
                  key={chat.id}
                  className="chat-item"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Chat Avatar"
                    className="chat-avatar"
                  />
                  <div className="chat-info">
                    <h3 className="chat-title">{chat.name}</h3>
                    <p className="last-message">{chat.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="right-section1" onScroll={handleScroll} ref={messageContainerRef}>
        <div className="chat-window">
          {/* Display the messages */}
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div className="Sender">{message.name}</div>
              <div className="messageContent">{message.text}</div>
            </div>
          ))}
        </div>
        <footer className="footer">
          {/* Content for the left section footer */}
        </footer>
      </div>
    </div>
  );
};

export default Messenger;
