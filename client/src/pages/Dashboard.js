import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import '../styles/dashboard.css';
import React from "react";
import Info from './Info';
import config from '../config';
import exp from "../App";


const Dashboard = () => {
    const routeParams = useParams();
    const [userData, setUserData] = useState(null);
    const [isClicked, setIsClicked] = useState(false)
    const {setCurrentUserId, setCurrentUsername} = useContext(exp.CurrentUserContext);
    let username = routeParams.username;

    useEffect(() => {
        let fetchData = async () => {
            let response = await fetch(`${config.uri}/users/${username}`);
            response = await response.json();

            setUserData(response[0]);
            setCurrentUserId(response[0].id);
            setCurrentUsername(response[0].username)
        }
        fetchData().then(_r => console.log())
    }, [username, setCurrentUserId, setCurrentUsername]);

    const toggleInfo = (_event) => {
        setIsClicked(!isClicked)
    }

    return (
        <div className='dashboard'>
            <h1>Hello, {userData ? userData.name : ''}</h1>
            <h2>You can get some more info by clicking on the button below</h2>
            {!isClicked && <button onClick={toggleInfo}>Show My Info</button>}
            {isClicked && <button onClick={toggleInfo}>Hide My Info</button>}
            {isClicked && <Info userData={userData}/>}
        </div>
    )
};


export default Dashboard;