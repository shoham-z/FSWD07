import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserFriends, FaUsers, FaSearch } from "react-icons/fa";
import NewGroup from "./NewGroup";


const NewChats = ({ contacts , setChosenContactChat, setNewGroup,setNewChat}) => {
  const [filteredContactData, setFilteredContactData] = useState(contacts);
  let navigate = useNavigate();

  const handleSearch = (event) => {
    const value = event.target.value;

    // Filter the chat data based on the input value
    const filteredContact = contacts.filter((chat) =>
      chat.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContactData(filteredContact);
  };

  const handleContactClick = (contactId) => {
    
    setChosenContactChat(contactId);
    
  };

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
          <li className="chat-item" onClick={() => {
            setNewChat(false);
            setNewGroup(true)}
            }>
            <FaUsers className="users-icon" />
            <div className="chat-info">
              <h3 className="chat-title" >New group</h3>
            </div>
          </li>
          {filteredContactData.map((contact) => (
            <li
              key={contact.id}
              className="chat-item"
              onClick={() => handleContactClick(contact.id)}
            >
              <img
                src="https://via.placeholder.com/50"
                alt="Chat Avatar"
                className="chat-avatar"
              />
              <div className="chat-info">
                <h3 className="chat-title">{contact.name}</h3>
                <p className="last-message">{contact.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewChats;
