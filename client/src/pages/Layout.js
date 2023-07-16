import {Outlet, Link, useParams, useNavigate} from "react-router-dom";
import '../styles/layout.css';

const Layout = () => {
    let navigate =  useNavigate();
    const routeParams = useParams();

    let base_url = `/users/${routeParams.username}/`
    return (
        <>
            <nav>
                <Link className='link' to={base_url}>Dashboard</Link> |
                <Link className='link' to={base_url + 'todos/'}>Todos</Link> |
                <Link className='link' to={base_url + 'posts/'}>Posts</Link> |
                <Link className='link' to={base_url + 'albums/'}>Albums</Link> |
                <Link className='link' to={base_url + 'settings/'}>Settings</Link>
            </nav>
            <button className='logout' onClick={(_event) =>{
                localStorage.removeItem("username");
                navigate(`/`)
            }}>Logout</button>
            <Outlet/>
        </>
    )
};

export default Layout;