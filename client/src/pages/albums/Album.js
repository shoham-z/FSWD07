import {useContext, useEffect, useState} from "react";
import '../../styles/album.css'
import '../../styles/title.css'
import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import config from '../../config';
import exp from "../../App";


const Album = () => {
    const {currentUsername} = useContext(exp.CurrentUserContext);
    const [album, setAlbum] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [photoTitle, setPhotoTitle] = useState([]);
    const [photoUrl, setPhotoUrl] = useState([]);
    const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
    const [editAlbumTitle, setEditAlbumTitle] = useState(album.title);

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const routeParams = useParams();

    const {currentUserId} = useContext(exp.CurrentUserContext);
    let albumId = parseInt(routeParams.albumId);

    useEffect(() => {
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/photos`);
            let photos = await response.json();
            const filteredArray = photos.filter(element => element.albumId === albumId);
            setPhotos(filteredArray)

            const album_response = await fetch(`${config.uri}/albums/${albumId}`);
            let albums = await album_response.json();
            setAlbum(albums[0]);
            setEditAlbumTitle(albums[0].title)
        }
        fetchData().then(r => console.log())
    }, [currentUserId, albumId]);

    const loadNext = (event) => {
        if (end >= 50) return;
        setStart(start + 10)
        setEnd(end + 10)
    }

    const loadPrevious = (event) => {
        if (start <= 0) return;
        setStart(start - 10)
        setEnd(end - 10)
    }
    const handlePhotoTitleChange = (event) => {
        event.preventDefault();

        setPhotoTitle(event.target.value);
    }

    const handlePhotoUrlChange = (event) => {
        event.preventDefault();

        setPhotoUrl(event.target.value);
    }
    const handleAlbumTitleChange = (ev) => {
        setEditAlbumTitle(ev.target.value)
    };

    const handleAddPhoto = (event) => {
        event.preventDefault();
        console.log(album.id, currentUserId, photoTitle, photoUrl)
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/photos/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        albumId: album.id,
                        title: photoTitle,
                        url: photoUrl,
                        thumbnailUrl: photoUrl
                    })
                });
            return response
        }
        // fetchData()

        fetchData().then(_r => console.log)
        console.log(photoTitle, photoUrl)
    }
    const toggleAlbumTitlePopup = () => {
        setIsEditTitleOpen(!isEditTitleOpen);
    };
    const handleEditAlbumTitle = (ev) => {
        ev.preventDefault()

        const newAlbum = {...album};
        newAlbum.title = editAlbumTitle;
        setAlbum(newAlbum)
        editAlbum(newAlbum)
        toggleAlbumTitlePopup()
    }

    const editAlbum = (album) => {
        delete album["data"]
        delete album["_id"]

        // userTodos.find(t => t.id===todo.id)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/albums/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(album)
                });
        }
        fetchData().then(_r => console.log(_r))
    }

    const editPhoto = (photo) => {
        delete photo["data"]
        delete photo["_id"]

        // userTodos.find(t => t.id===todo.id)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/photos/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(photo)
                });
        }
        fetchData().then(_r => console.log(_r))
    }

    const deletePhoto = (photo) => {
        let newArray = photos.filter((p) => p.id!==photo.id);
        setPhotos(newArray)


        let fetchData = async () => {
            const response = await fetch(`${config.uri}/photos/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        id: photo.id
                    })
                });

        }

        fetchData().then(_r => console.log)
    }

    return (
        <div className='container'>
            <Link className='go-back' to={`/users/${currentUsername}/albums/`}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Link>
            <h3>Album: {album.title}
                <button className="edit" onClick={toggleAlbumTitlePopup}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button></h3>
            {isEditTitleOpen && <div className="edit-container">
                <form onSubmit={handleEditAlbumTitle}>
                    <label htmlFor="edit">Edit Album Title</label>
                    <br/>
                    <input id="editTitle" name="editTitle" type="text"

                           value={editAlbumTitle}
                           onChange={handleAlbumTitleChange}/>

                    <br/><br/>
                    <button className="cancel" type="button" onClick={() => toggleAlbumTitlePopup()}>Cancel</button>
                    <br/>
                    <button className="save" type="submit">Save</button>
                </form>
            </div>}
            <div className='photo-album'>
                <div className="photo-grid">
                    {photos.slice(start, end).map(photo => (
                        <Photo key={photo.id} photo={photo} editPhoto={editPhoto} deletePhoto={()=>deletePhoto(photo)}/>))}
                </div>
                <div className='album-buttons'>
                    {start > 0 && <button className="load-more" onClick={loadPrevious}>Previous Page</button>}
                    {end < 50 && <button className="load-more" onClick={loadNext}>Next Page</button>}
                </div>
            </div>

            <br/>
            <br/>
            <form onSubmit={handleAddPhoto}>
                <input id="photoTitle"
                       name="photoTitle"
                       type="text"
                       placeholder={"Photo Title"}
                       value={photoTitle}
                       onChange={handlePhotoTitleChange}/>
                <br/><br/>
                <input id="photoUrl"
                       name="photoUrl"
                       type="text"
                          placeholder={"Photo Url"}
                       value={photoUrl}
                       onChange={handlePhotoUrlChange}/>
                <br/><br/>

                <button type="submit" onClick={(e) => {
                }}>Add Photo
                </button>
            </form>
        </div>
    );
};

const Photo = (props) => {
    const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false);
    const [photoTitle, setPhotoTitle] = useState(props.photo.title);
    const [photoUrl, setPhotoUrl] = useState(props.photo.thumbnailUrl);

    const togglePhotoPopup = () => {
        setIsEditPhotoOpen(!isEditPhotoOpen);
    }
    const handleTitleChange = (ev) => {
        setPhotoTitle(ev.target.value)
    };
    const handleUrlChange = (ev) => {
        setPhotoUrl(ev.target.value)
    };
    const editPhoto = (ev) => {
        ev.preventDefault()

        const newPhoto = props.photo;

        newPhoto.title = photoTitle;
        newPhoto.thumbnailUrl = photoUrl;
        props.editPhoto(newPhoto)
        togglePhotoPopup()
    }

    let photo = props.photo;
    return (
        <div key={photo.id} className='photo'>
            <img src={photo.thumbnailUrl} alt={`#${photo.id % 50}`}/>
            <p>{photo.title}</p>
            <button className="edit" onClick={togglePhotoPopup}>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button className="delete" onClick={props.deletePhoto}>
                <i className="far fa-trash-alt"></i>
            </button>
            {isEditPhotoOpen && <div className="edit-container">
                <form onSubmit={editPhoto}>
                    <label htmlFor="edit">Edit Photo</label>
                    <br/>
                    <input id="edit" name="username" type="text"
                           value={photoTitle}
                           onChange={handleTitleChange}/>
                    <br/><br/>
                    <input id="editUrl" name="url" type="text"
                           value={photoUrl}
                           onChange={handleUrlChange}/>
                    <br/><br/>
                    <button className="cancel" type="button" onClick={() => togglePhotoPopup()}>Cancel</button>
                    <br/>
                    <button className="save" type="submit">Save</button>
                </form>
            </div>}
        </div>
    )

}

export default Album;
