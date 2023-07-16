import {useState} from "react";
import '../styles/form.css';
import {useNavigate} from "react-router-dom";
import config from '../config';

const Register = (_props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordsError, setPasswordsError] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');


    const [isRegistering, setIsRegistering] = useState(true);


    let handleRegister = (event) => {
        event.preventDefault();

        setPasswordsError(false);

        if (password !== passwordRepeat) {
            setPasswordsError(true);
            return;
        }

        fetch(`${config.uri}/register`, {
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
                if (data.message !== "Register successful") return;

                setIsRegistering(false)

            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }

    let inputChanged = (event) => {
        if (event.target.name === 'username') setUsername(event.target.value)
        else if (event.target.name === 'password') setPassword(event.target.value)
        else if (event.target.name === 'passwordRepeat') setPasswordRepeat(event.target.value)
        else if (event.target.name === 'name') setName(event.target.value)
        else if (event.target.name === 'phone') setPhone(event.target.value)
        else if (event.target.name === 'email') setEmail(event.target.value)
    }

    const submitData = (ev) => {
        ev.preventDefault();

        let fetchData = async () => {
            return await fetch(`${config.uri}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({username, name, phone, email})
            });
        }
        fetchData()
            .then(response => response.json())
            .then(_ => {
                // Handle the response data
                setTimeout(() => navigate(`/users/${username}`), 1000)

            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };
    return (
        <div className="form">
            {isRegistering && <div><h2>Register</h2>
                {passwordsError && <h3>Passwords Not Matching</h3>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username"
                               placeholder={"Enter Username"}
                               value={username} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password"
                               placeholder={"Enter Password"}
                               value={password} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRepeat">Password Repeat:</label>
                        <input type="password" name="passwordRepeat"
                                 placeholder={"Repeat Password"}
                               value={passwordRepeat} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <button className="adduser" type="submit">Register</button>
                    </div>
                </form>
            </div>}

            {!isRegistering && <div>
                <h2>Register Successful!</h2>
                <h2>Enter User Data</h2>
                <form onSubmit={submitData}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name:</label>
                        <input type="text" name="name"
                               value={name} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name="phone"
                               value={phone} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email"
                               value={email} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <button className="adduser" type="submit">Submit</button>
                    </div>
                </form>
            </div>}
        </div>
    );
};

export default Register;