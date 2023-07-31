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
                     setNewContact,
                     setChosenChat,
                     chosenChat,
                     newChat,
                     newGroup,
                     setNewGroup,
                     settings,
                     setNewChat
}) => {
  // const user_id = JSON.parse(localStorage.getItem("user")).id;
  const [chatData, setChatData] = useState(JSON.parse(localStorage.getItem("Chats")) || [])
  const [filteredChatData, setFilteredChatData] = useState(chatData);
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const username = localStorage.getItem("username");
  const [phone, setPhone] = useState(0);
  const [contacts, setContacts] = useState([]);


  const [messageInput, setMessageInput] = useState("");

  //get contacts
  useEffect(() => {
    fetch(`${config.uri}/contacts?userPhone=${phone}`)
        .then((response) => response.json())
        .then((data) => {
          setContacts(data)
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
  }, [phone])

  //get user phone
  useEffect(()=>{
    fetch(`${config.uri}/users/phone?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          console.log(username)
          setPhone(data)
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
  }, [username])

  //get messages
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

  const handleChangeMessage = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {

      const newMessage = {
        sender: phone,
        recipient: "1111111111",
        content: messageInput,
        time: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };

      fetch(`${config.uri}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(newMessage)
      })
          .then(response => response.json())
          .then(data => {
            // Handle the response data
            if (data.message !== "Login successful") {
              alert("Login failed\nYour username or password is incorrect")
              return;
            }
            localStorage.setItem("username", username);

          })
          .catch(error => {
            // Handle any errors
            alert("Login failed")
            console.error(error);
          });

      //handleChatClick(chosenChat);

      // Add the new message to the beginning of the messages list
      setMessages((prevMessages) => [newMessage, ...prevMessages]);

      // Clear the message input after sending the message
      setMessageInput("");
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;

    // Filter the chat data based on the input value
    const filteredChats = chatData.filter((chat) =>
      chat.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredChatData(filteredChats);
  };

  const handleChatClick = (chatId) => {
    console.log(chatId)
    setChosenChat(chatId);
    fetch(`${config.uri}/messages?userPhone=${phone}&contactPhone=${chatId}`)
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

  const handlePage = () => {
    if (newChat) {
      return (
        <NewChats
          contacts={contacts}
          setNewGroup={setNewGroup}
          setNewChat={setNewChat}
          setNewContact = {setNewContact}
          userphone={phone}
          setChosenContactChat={handleChatClick}
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
        handlePage()
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
          {messages.length===0 && <h2>No messages yet</h2>}
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div className="Sender">{message.name}</div>
              <div className="messageContent">{message.content}</div>
              <div className="messageTime">{message.time}</div>
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
