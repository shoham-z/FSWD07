import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserFriends, FaUsers } from "react-icons/fa";

const NewGroup = ({ connections }) => {
  let navigate = useNavigate();

  const handleOpenChat = () => {
    // Replace this with your code to open a new chat
    console.log("Open new chat");
  };

  const handleOpenGroup = () => {
    // Replace this with your code to open a new group
    console.log("Open new group");
  };

  return (
    <div className="left-section1">
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
  );
};

export default NewGroup;
