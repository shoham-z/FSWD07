import React, {useState} from "react";
import "../styles/form.css";
import {useNavigate} from "react-router-dom";
import config from "../config";

const Register = (_props) => {
    const navigate = useNavigate();

    // user data fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    //flags
    const [passwordsError, setPasswordsError] = useState(false);
    const [formFilled, setFormFilled] = useState(false);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setSelectedFile(file);
        // Create a preview of the selected image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUpload = () => {
        //   fetch(`${config.uri}/${user_id}/pfp`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify({ selectedFile }),
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       // Handle the response data
        //       if (data.message !== "Uploaded successfully") return;
        //     })
        //     .catch((error) => {
        //       // Handle any errors
        //       console.error(error);
        //     });
    };


    let gotoUploadPfp = (event) => {
        event.preventDefault();

        setFormFilled(false);
        setPasswordsError(false);

        if (password !== passwordRepeat) {
            setPasswordsError(true);
            return;
        }

        setFormFilled(true);


        // fetch(`${config.uri}/register`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify({username, password}),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Handle the response data
        //         if (data.message !== "Register successful") return;
        //
        //         setTimeout(() => navigate('/ImageUploader'), 1000);
        //     })
        //     .catch((error) => {
        //         // Handle any errors
        //         console.error(error);
        //     });
    };

    let inputChanged = (event) => {
        if (event.target.name === "username") setUsername(event.target.value);
        else if (event.target.name === "password") setPassword(event.target.value);
        else if (event.target.name === "passwordRepeat")
            setPasswordRepeat(event.target.value);
        else if (event.target.name === "name") setName(event.target.value);
        else if (event.target.name === "phone") setPhone(event.target.value);
        else if (event.target.name === "email") setEmail(event.target.value);
    };

    return (
        <div>
            {!formFilled && <div className="form">
                <h2>Register</h2>
                {formFilled && <h3>Passwords Not Matching</h3>}
                <form onSubmit={gotoUploadPfp}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder={"Enter Username"}
                            value={username}
                            onChange={inputChanged}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder={"Enter Password"}
                            value={password}
                            onChange={inputChanged}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRepeat">Password Repeat:</label>
                        <input
                            type="password"
                            name="passwordRepeat"
                            placeholder={"Repeat Password"}
                            value={passwordRepeat}
                            onChange={inputChanged}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Your Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={"Enter Name"}
                            value={name}
                            onChange={inputChanged}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder={"Enter Phone Number"}
                            value={phone}
                            onChange={inputChanged}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder={"Enter Email"}
                            value={email}
                            onChange={inputChanged}
                        />
                    </div>
                    <div className="form-group">
                        <button className="adduser" type="submit" onClick={() => navigate("/ImageUploader/")}>
                            Submit
                        </button>
                        <div className="form-group">
                            <button type="button" onClick={() => navigate("/login/")}>
                                login
                            </button>
                        </div>
                    </div>
                </form>
            </div>}
            {formFilled && <div className="image-upload">
                <div className="bodyU">
                    <div className="blue-frame">
                        <h2 className="upload-title">Upload your profile image</h2>
                        <div className="profile-image-upload">
                            <div className="image-preview">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview"/>
                                ) : (
                                    <div className="placeholder">
                                        <span>Preview</span>
                                    </div>
                                )}
                            </div>
                            <button>
                                <label htmlFor="fileInput" className="upload-button">
                                    {photoPreview ? "Change Image" : "Choose Image"}
                                </label>
                                <input
                                    type=""
                                    id="fileInput"
                                    onChange={handlePhotoChange}
                                    style={{display: "none"}}
                                />
                            </button>
                            <br/>
                            <button onClick={handleUpload} disabled={!selectedFile}>
                                Upload
                            </button>
                        </div>
                    </div>
                    <div className="next-button-container">
                        <button className="next-button" onClick={() => {
                            navigate('/messenger/')
                        }}>
                            Next
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Register;
