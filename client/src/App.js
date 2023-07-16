import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

import {createContext, useState} from "react";
import Register from "./pages/Register";

const CurrentUserContext = createContext(null);

function App() {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);

    return (
        <CurrentUserContext.Provider
            value={{
                currentUserId,
                setCurrentUserId,
                currentUsername,
                setCurrentUsername
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to='/login/'/>}/>
                    <Route element={<Layout/>}>

                        <Route path="*" element={<NoPage/>}/>
                        <Route path="login/" element={<Login/>}/>
                        <Route path="register/" element={<Register/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </CurrentUserContext.Provider>
    );
}

const exp = {App, CurrentUserContext};
export default exp;
