import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ImageUploader.css";
import config from '../config';

const ImageUploader = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Create a preview of the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const user_id = JSON.parse(localStorage.getItem("user")).id;

  const handleUpload = () => {
    fetch(`${config.uri}/${user_id}/pfp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ selectedFile }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        if (data.message !== "Uploaded successfully") return;
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleNext = () => {
    navigate("/messenger/");
  };

  return (
    <div className="bodyU">
      <div className="blue-frame">
        <h2 className="upload-title">Upload your profile image</h2>
        <div className="profile-image-upload">
          <label htmlFor="fileInput" className="upload-button">
            {previewImage ? "Change Image" : "Choose Image"}
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="image-preview">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <div className="placeholder">
                <span>Preview</span>
              </div>
            )}
          </div>
          <button onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </button>
        </div>
      </div>
      <div className="next-button-container">
        <button
          className="next-button"
          onClick={() => {
            navigate("/messenger/");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
