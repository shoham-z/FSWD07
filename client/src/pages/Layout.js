import React, { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import {
  FaUser,
  FaSearch,
  FaArrowLeft,
  FaComment,
  FaBars,
} from "react-icons/fa";

const Layout = ({
  chosenChat,
  setNewChat,
  newChat,
  setSettings,
  settings,
  setNewGroup,
  newGroup,
  chosenContact,
  setNewContact,
  newContact
}) => {
  let navigate = useNavigate();
  const routeParams = useParams();
  const [userImage, setUserImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userImageURL = localStorage.getItem("userImage");
    //const userName = localStorage.getItem("username");
    setUserImage(userImageURL);
  }, []);

  const handleBackClick = () => {
    setNewGroup(false);
    setNewChat(false);
    setSettings(false);
    setNewContact(false);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelTitle = () => {
    if (settings) {
      return "Settings";
    } else if (newChat && !newContact) {
      return "New Chat";
    } else if(newGroup){
      return "New Group";
    }
    else{
      return 'New Contact'
    }
  };

  const handleMenuOptionClickLeft = (option) => {
    if (option === "New group") {
      setNewGroup(true);
      setSettings(false);
      setNewChat(false);
    } else if (option === "Settings") {
      setSettings(true);
      setNewGroup(false);
      setNewChat(false);
    } else {
      localStorage.removeItem("username")
      navigate("/login");
    }
    // Handle the selection menu option click here
    console.log("Selected option:", option);
    setIsMenuOpen(false); // Close the menu after selecting an option
  };

  let base_url = `/users/${routeParams.username}/`;

  return (
    <>
      <div className="container">
        {newChat || newGroup || settings || newContact ? (
          <div className="left-section">
            <nav>
              <Link className="link" onClick={handleBackClick}>
                <FaArrowLeft className="back-icon" />
              </Link>
              <div className="left-side-bar">
                <h2>{handelTitle()}</h2>
              </div>
              <div className="right-side-bar"></div>
            </nav>
          </div>
        ) : (
          <div className="left-section">
            <nav>
              <div className="left-side-bar">
                {/* Use the user's image as the profile image */}
                {userImage ? (
                  <img
                    className="profile-image"
                    src={userImage}
                    alt="Profile"
                  />
                ) : (
                  <FaUser className="profile-icon" />
                )}
              </div>
              <div className="right-side-bar">
                <Link className="link" onClick={() => setNewChat(true)}>
                  <FaComment className="chat-icon" />
                </Link>
                <Link className="link" onClick={handleMenuClick}>
                  <FaBars className="menu-icon" />
                </Link>
              </div>
            </nav>
            {isMenuOpen && (
              <div className="selection-menu">
                <ul>
                  <li onClick={() => handleMenuOptionClickLeft("New group")}>
                    New group
                  </li>
                  <li onClick={() => handleMenuOptionClickLeft("Settings")}>
                    Settings
                  </li>
                  <li onClick={() => handleMenuOptionClickLeft("Log out")}>
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="right-section">
          <nav>
            <div className="left-side-bar">
              {/* Use the user's image as the profile image */}
              {chosenChat ? (
                <>
                  <img
                    className="profile-image"
                    src={chosenChat.image}
                    alt="Profile"
                  />
                  <p className="chat-name">{chosenChat.name}</p>
                </>
              ) : (
                <>
                <FaUser className="profile-icon" />
                </>
              )}
            </div>
            <div className="right-side-bar">
              <Link className="link" >
                <FaSearch className="search-icon" />
              </Link>
              <Link className="link" to={base_url}>
                <FaBars className="menu-icon" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
