import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Todos from "./pages/todo/Todos";
import NoPage from "./pages/NoPage";
import Posts from "./pages/posts/Posts";
import Albums from "./pages/albums/Albums";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/posts/Post";
import Album from "./pages/albums/Album";
import {createContext, useState} from "react";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

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
                        <Route path="/users/:username/" element={<Dashboard/>}/>
                        <Route path="/users/:username/settings" element={<Settings/>}/>
                        <Route path="/users/:username/todos/" element={<Todos/>}/>
                        <Route path="/users/:username/posts/" element={<Posts/>}/>
                        <Route path="/users/:username/posts/:postId" element={<Post/>}/>
                        <Route path="/users/:username/albums/" element={<Albums/>}/>
                        <Route path="/users/:username/albums/:albumId" element={<Album/>}/>
                    </Route>
                    <Route path="*" element={<NoPage/>}/>
                    <Route path="login/" element={<Login/>}/>
                    <Route path="register/" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </CurrentUserContext.Provider>
    );
}

const exp = {App, CurrentUserContext};
export default exp;
