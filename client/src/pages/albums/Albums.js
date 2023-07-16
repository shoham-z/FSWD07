import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import '../../styles/albums-posts.css'
import config from '../../config';
import exp from "../../App";

const Albums = () => {
    const routeParams = useParams();
    const [userAlbums, setUserAlbums] = useState([]);
    const {currentUserId} = useContext(exp.CurrentUserContext);

    useEffect(() => {
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/albums?userId=${currentUserId}`);
            let albums = await response.json();
            albums.sort((a, b) => a.id - b.id)

            setUserAlbums(albums)
        }
        fetchData().then(_r => console.log())
    }, [currentUserId]);

    const deleteAlbum = (album) => {
        let newArray = userAlbums.filter((a) => a.id!==album.id);
        setUserAlbums(newArray)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/albums/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        id: album.id
                    })
                });

        }
        fetchData().then(_r => console.log)
    }

    return (
        <div>
            <div className='header'>
                <h2 className='description'>{routeParams.username}'s albums</h2>
            </div>
            <div className='content'>
                {userAlbums.map((album) => (
                    <div key={album.id}>
                        <Link className='item_link' to={`${album.id}`}>
                            Album {album.id}: {album.title}</Link>
                        <button className="delete" onClick={()=>deleteAlbum(album)}>
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>))}
            </div>
        </div>
    );
};

export default Albums;
