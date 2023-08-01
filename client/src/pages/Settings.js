import {useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import '../styles/dashboard.css';
import React from "react";
import config from '../config';
import exp from "../App";
import '../styles/form.css'


const Settings = ({userPhone}) => {
    console.log(userPhone)
    const routeParams = useParams();
    const {currentUsername} = useContext(exp.CurrentUserContext);
    let username = JSON.parse(localStorage.getItem('userName'));
    let navigate =  useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [passwordChanged, setPasswordChanged] = useState(false)
    const [mismatchPasswords, setMismatchPasswords] = useState(false)
    const [samePassword, setSamePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

    const toggleChangePassword = (_ev) => {
        setChangePassword(!changePassword)
    }

    let inputChanged = (event) => {
        if (event.target.name === 'oldPassword') setOldPassword(event.target.value)
        else if (event.target.name === 'newPassword') setNewPassword(event.target.value)
        else if (event.target.name === 'newPasswordRepeat') setNewPasswordRepeat(event.target.value)
    }

    const submitChangePassword = async (ev) => {
        ev.preventDefault()

        setSamePassword(false)
        setMismatchPasswords(false)

        if (newPassword === oldPassword) {
            setSamePassword(true)
            return;
        }

        if (newPassword !== newPasswordRepeat) {
            setMismatchPasswords(true)
            return;
        }

        let fetchData = async () => {
            return await fetch(`${config.uri}/users/changePassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({userPhone,newPassword})
                });

        }
        fetchData()
            .then(r=> console.log(r))

        setChangePassword(false)
        setPasswordChanged(true)
        }

    const deleteUserConfirm = () => {
        setConfirmDelete(true)
    };
    const submitDeleteUser = () => {
        let fetchData = async () => {
            return await fetch(`${config.uri}/users/delete-user`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({userPhone})
            });

        }
        fetchData()
            .then(r=> console.log(r))
        localStorage.removeItem("username");
        navigate(`/`)
    };
    return (
        <div className="left-section1">
            <h1>Hello, {username}</h1>
            <h2>Settings</h2>

            {passwordChanged && <h3>Password Updated!</h3>}
            {!changePassword && <button onClick={toggleChangePassword}>Change Password</button>}
            {changePassword && <div className="form">
                {mismatchPasswords && <h3>New passwords not matching!</h3>}
                {samePassword && <h3>New password is the same as old password!</h3>}
                <form onSubmit={submitChangePassword}>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input type="password" name="oldPassword"
                               placeholder={"Enter your old password"}
                               value={oldPassword} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input type="password" name="newPassword"
                                 placeholder={"Enter your new password"}
                               value={newPassword} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPasswordRepeat">New Password Again:</label>
                        <input type="password" name="newPasswordRepeat"
                                 placeholder={"Enter your new password again"}
                               value={newPasswordRepeat} onChange={inputChanged}/>
                    </div>
                    <div className="form-group">
                        <button type="submit">Change Password</button>
                    </div>
                </form>
            </div>}
            <br/>
            <br/>

            <button onClick={deleteUserConfirm}>Delete User</button>
            {confirmDelete && <div className="form">
                <h3>Are you sure you want to delete your account?</h3>
                <h3>This action cannot be undone!</h3>
                <form onSubmit={submitDeleteUser}>
                    <div className="form-group">
                        <button type="submit">Confirm</button>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={()=>setConfirmDelete(false)}>Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    )
};


export default Settings;