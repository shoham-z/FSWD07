import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/ImageUploader.css";

const ImageUploader = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

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

  const handleUpload = () => {
    // Replace this part with your code to upload the image to the server and save it as the profile image
    console.log("Image uploaded:", selectedFile);
  };

  const handleNext = () => {
       navigate('/messenger/');
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
        <button className="next-button" onClick={() => {
                        navigate('/messenger/')}}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
