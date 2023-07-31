import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import NewChats from "./NewChats";
import NewGroup from "./NewGroup";
import Settings from "./Settings";
import "../styles/Messenger.css";
import "../styles/newContact.css";
import { FaSearch ,FaPaperPlane  } from "react-icons/fa";
import config from "../config.json";


const Messenger = ({
  chatData,
  setChosenChat,
  chosenChat,
  newChat,
  settings,
  newGroup,
  contacts,
  setNewGroup,
  setNewChat,
  setNewContact
}) => {
  // const user_id = JSON.parse(localStorage.getItem("user")).id;
  const chatData1 = JSON.parse(localStorage.getItem("Chats")) || chatData
  const [filteredChatData, setFilteredChatData] = useState(chatData1);
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const username = localStorage.getItem("username");
  const [phone, setPhone] = useState(0);

  const [messageInput, setMessageInput] = useState("");

  const handleChangeMessage = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      // Send the message to the right section (assuming chatId is defined)
      // For simplicity, we'll just create a dummy message object
      const newMessage = {
        id: messages.length + 1, // You may want to generate a unique ID
        name: "Your Name", // Replace with the sender's name
        text: messageInput,
      };

      // Add the new message to the beginning of the messages list
      setMessages((prevMessages) => [newMessage, ...prevMessages]);

      // Clear the message input after sending the message
      setMessageInput("");
    }
  };

  useEffect(()=>{
    fetch(`${config.uri}/users/phone?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          setPhone(data)
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
  }, [username])

  useEffect(() => {


    
    const dummyMessages = [
      {
        id: 1,
        text: "Message 1 lzjjhfsddhfolashpaoiruijpoajkgboaieupoviwenjgowehmvioiweojgnpkkhehjbgoiaenlkafbvpoifjvnklajjbgpanv lkfsjbghmvowepijn",
      },
      { id: 2, text: "Message 2" },
      { id: 3, text: "Message 3" },
      // Add more messages here
    ];

    setMessages(dummyMessages);
  }, [setChosenChat]); // Fetch messages when the selected chat changes

  const handleSearch = (event) => {
    const value = event.target.value;

    // Filter the chat data based on the input value
    const filteredChats = chatData1.filter((chat) =>
      chat.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredChatData(filteredChats);
  };

  const handleChatClick = (chatId) => {
    console.log(chatId)
    setChosenChat(chatId);
    fetch(`${config.uri}/messages?userPhone=${'1111111111'}&contactPhone=${chatId}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        setMessages(data)
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleScroll = () => {
   /* fetch(`${config.uri}/${user_id}/${chosenChat}/messages`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setTimeout(() => {
          setMessages((prevMessages) => [...data, ...prevMessages]);
        }, 1000);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });*/
  };

  const handelPage = () => {
    if (newChat) {
      return (
        <NewChats
          contacts={contacts}
          setNewGroup={setNewGroup}
          setNewChat={setNewChat}
          setNewContact = {setNewContact}
          userphone={phone}
        />
      );
    } else if (newGroup) {
      return <NewGroup contacts={contacts} />;
    } else {
      return <Settings />;
    }
  };

  return (
    <div className="container2">
      {newChat || newGroup || settings ? (
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
                  onClick={() => handleChatClick('6666666666')}
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
      <div
        className="right-section1"
        onScroll={handleScroll}
        ref={messageContainerRef}
      >
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
        <div className="message-input-container">
            <input
              type="text"
              value={messageInput}
              onChange={handleChangeMessage}
              placeholder="Type your message..."
              className="message-input"
            />
            <div className="send-icon" onClick={handleSendMessage}>
              <FaPaperPlane />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Messenger;
