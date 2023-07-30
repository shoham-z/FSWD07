import React, { useState } from "react";
import config from "../config.json";

const NewContact = (prop) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setPhone(event.target.value);
  };

  const saveContact = (event) => {
      event.preventDefault();

      fetch(`${config.uri}/contacts?userPhone=${prop.phone}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({name, phone})
      })
          .then(response => response.json())
          .then(data => {
              // Handle the response data
              if (data.message !== "New contact successful") {
                  alert("Failed to save the contact")
                  return;
              }

              alert(data.message)

          })
          .catch(error => {
              // Handle any errors
              alert("Could not save the contact")
              console.error(error);
          });
  };

  return (
    <form onSubmit={saveContact}>
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
        <button className="save-button" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default NewContact;
