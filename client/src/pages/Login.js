import {useEffect, useState} from "react";
import '../styles/form.css';
import {useNavigate} from "react-router-dom";
import config from '../config';

const Login = (_props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem("username") || '');
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("username") || false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (loggedIn) navigate(`/messenger`);
    })

    let handleLogin = (event) => {
        event.preventDefault();

        console.log({username, password})

        fetch(`${config.uri}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({username, password})
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                if (data.message !== "Login successful") {
                    alert("Login failed\nYour username or password is incorrect")
                    return;
                }
                localStorage.setItem("username", username);
                setLoggedIn(username);

                navigate(`/users/${username}`);
            })
            .catch(error => {
                // Handle any errors
                alert("Login failed")
                console.error(error);
            });
    }

    let inputChanged = (event) => {
        event.target.name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value);
    }

    return (
        <div className="form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username"
                           placeholder={"Username"}
                           value={username} onChange={inputChanged}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password"
                           placeholder={"Password"}
                           value={password} onChange={inputChanged}/>
                </div>
                <div className="form-group">
                    <button className="adduser" type="submit">Login</button>
                </div>
                <div className="form-group">
                    <button type='button' onClick={() => {
                        navigate('/register/')}}>Register</button>
                </div>
                <div className="form-group">
                    <button type='button' onClick={() => {
                        navigate('/messenger/')}}>login 1</button>
                </div>
            </form>
        </div>
    );
};

export default Login;