import React, { useState } from "react";

const NewContact = () => {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleNameChange = (event) => {
    setContactName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleSaveContact = () => {
    // Add your logic here to save the new contact
    // For example, you can use the contactName and contactNumber states
  };

  return (
    <div className="new-contact-container">
      <div className="input-container">
        <input
          onChange={handleNameChange}
          type="text"
          className="input-field"
          placeholder="Name"
        />
      </div>
      <div className="input-container">
        <input
          onChange={handleNumberChange}
          type="text"
          className="input-field"
          placeholder="Phone Number"
        />
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSaveContact}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NewContact;
