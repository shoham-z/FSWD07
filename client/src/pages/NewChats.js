import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaUserFriends, FaUsers, FaSearch, FaUserPlus} from "react-icons/fa";
import NewGroup from "./NewGroup";
import NewContact from "./newContact";
import config from "../config.json";

const NewChats = ({
                      setContacts,
                      userphone,
                      contacts,
                      setChosenContactChat,
                      setNewGroup,
                      setNewChat,
                      setNewContact,
                  }) => {
    const [filteredContactData, setFilteredContactData] = useState(contacts);
    const [showNewContact, setShowNewContact] = useState(false);
    let navigate = useNavigate();

    const handleSearch = (event) => {
        const value = event.target.value;
        if(value==="") return;

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

    const handleAddContact = () => {
        setShowNewContact(true); // Set the state to show the NewContact component
        setNewContact(true)
        // setNewChat(false);
    };

    return (
        <div className="left-section1">
            {showNewContact ? (
                <NewContact phone={userphone} setContacts = {setContacts} />
            ) : (
                <>
                    <nav className="search">
                        <div className="add-contact-icon" onClick={handleAddContact}>
                            <FaUserPlus/>
                        </div>

                        <div className="search-box">
                            <FaSearch className="search-icon"/>
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
                            <li
                                className="chat-item"
                                onClick={() => {
                                    setNewChat(false);
                                    setNewGroup(true);
                                }}
                            >
                                <FaUsers className="users-icon"/>
                                <div className="chat-info">
                                    <h3 className="chat-title">New group</h3>
                                </div>
                            </li>
                            {filteredContactData.map((contact) => (
                                <li
                                    key={`${contact.phone2}`}
                                    className="chat-item"
                                    onClick={() => handleContactClick(contact.phone2)}
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
                </>
            )}
        </div>
    );
};

export default NewChats;
