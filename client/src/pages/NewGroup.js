import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserFriends, FaUsers, FaSearch, FaTimes } from "react-icons/fa";
import "../styles/NewGroup.css"; // Add a CSS file for NewChats styles

const NewChats = ({ contacts, setChosenContactChat }) => {
  const [filteredContactData, setFilteredContactData] = useState(contacts);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const value = event.target.value;

    // Filter the contact data based on the input value
    const filteredContact = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContactData(filteredContact);
  };

  const handleContactClick = (contactId) => {
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!selectedContacts.includes(contact)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
    // setChosenContactChat(contactId);
  };

  const handleCancelContact = (contactId) => {
    const updatedSelectedContacts = selectedContacts.filter(
      (contact) => contact.id !== contactId
    );
    setSelectedContacts(updatedSelectedContacts);
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
      {selectedContacts.length > 0 && (
        <div className="selected-contacts">
          {selectedContacts.map((contact) => (
            <span key={contact.id} className="selected-contact">
              {contact.name}
            </span>
          ))}
        </div>
      )}
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
              {selectedContacts.includes(contact) && (
                <div className="selected-contact-overlay">
                  <FaTimes
                    className="cancel-icon"
                    onClick={() => handleCancelContact(contact.id)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewChats;
