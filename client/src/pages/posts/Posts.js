import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import '../../styles/albums-posts.css'
import config from '../../config';
import exp from "../../App";

const Posts = () => {
    const routeParams = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const {currentUserId} = useContext(exp.CurrentUserContext);


    useEffect(() => {
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/posts?userId=${currentUserId}`);
            const posts = await response.json();

            posts.sort((a, b) => a.id - b.id)

            setUserPosts(posts)
        }
        fetchData().then(_r => console.log())
    }, [currentUserId]);
    const deletePost = (post) => {
        let newArray = userPosts.filter((p) => p.id!==post.id);
        setUserPosts(newArray)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/posts/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        id: post.id
                    })
                });

        }

        fetchData().then(_r => console.log)
    }

    return (
        <div>
            <div className='header'>
                <h2 className='description'>{routeParams.username}'s posts</h2>
            </div>
            <div className='content'>
                {userPosts.map((post) => (
                    <div key={post.id}>
                        <Link className='item_link' to={`${post.id}`} >
                            Post {post.id}: {post.title}
                            </Link>
                        <button className="delete" onClick={()=>deletePost(post)}>
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>))}
            </div>
        </div>
    );
};

export default Posts;