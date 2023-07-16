import '../../styles/post.css'
import '../../styles/title.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import config from '../../config';
import exp from "../../App";

const Post = () => {
    const {currentUsername} = useContext(exp.CurrentUserContext);
    const [post, setPost] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
    const [isEditBodyOpen, setIsEditBodyOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);
    const [editBody, setEditBody] = useState(post.body);
    const [displayCount, setDisplayCount] = useState(0);
    const routeParams = useParams();

    const {currentUserId} = useContext(exp.CurrentUserContext);
    const postId = parseInt(routeParams.postId);

    useEffect(() => {
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/comments?postId=${postId}`);
            let comments = await response.json();
            comments.sort((a, b) => a.id - b.id);
            setComments(comments)

            const post_response = await fetch(`${config.uri}/posts/${postId}`);
            const posts = await post_response.json();
            setPost(posts[0]);
            setEditTitle(posts[0].title)
            setEditBody(posts[0].body)
        }
        fetchData().then(_r => console.log())
    }, [currentUserId, postId]);

    const handleChange = (event) => {
        event.preventDefault();

        setComment(event.target.value);
    }

    const handleTitleChange = (ev) => {
        setEditTitle(ev.target.value)
    };
    const handleBodyChange = (ev) => {
        setEditBody(ev.target.value)
    };
    const handleAddComment = (event) => {
        event.preventDefault();
        console.log(post.id, currentUserId, comment)
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/comments/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        postId: post.id,
                        name: currentUsername,
                        body: comment
                    })
                });
            return response
        }
        fetchData().then(_r => console.log)
        console.log(comment)
    }
    const toggleTitlePopup = () => {
        setIsEditTitleOpen(!isEditTitleOpen);
    };
    const toggleBodyPopup = () => {
        setIsEditBodyOpen(!isEditBodyOpen);
    };
    const editPostTitle = (ev) => {
        ev.preventDefault()

        const newPost = {...post};
        newPost.title = editTitle;
        setPost(newPost)
        editPost(newPost)
        toggleTitlePopup()
    }
    const editPostBody = (ev) => {
        ev.preventDefault()

        const newPost = {...post};
        newPost.body = editBody;
        setPost(newPost)
        editPost(newPost)
        toggleBodyPopup()
    }
    const editPost = (post) => {
        delete post["data"]
        delete post["_id"]

        // userTodos.find(t => t.id===todo.id)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/posts/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(post)
                });
        }
        fetchData().then(_r => console.log(_r))
    }

    const editComment = (comment) => {
        delete comment["data"]
        delete comment["_id"]

        // userTodos.find(t => t.id===todo.id)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/comments/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(comment)
                });
        }
        fetchData().then(_r => console.log(_r))
    }

    const deleteComment = (comment) => {
        let newArray = comments.filter((c) => c.id!==comment.id);
        setComments(newArray)


        let fetchData = async () => {
            const response = await fetch(`${config.uri}/comments/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        id: comment.id
                    })
                });

        }

        fetchData().then(_r => console.log)
    }
    return (
        <div className='container'>
            <Link className='go-back' to={`/users/${currentUsername}/posts/`}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Link>

            <h2 className='post_title'>{post.title}
                <button className="edit" onClick={toggleTitlePopup}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            </h2>
            {isEditTitleOpen && <div className="edit-container">
                <form onSubmit={editPostTitle}>
                    <label htmlFor="edit">Edit Post Title</label>
                    <br/>
                    <input id="edit" name="username" type="text"

                           value={editTitle}
                           onChange={handleTitleChange}/>

                    <br/><br/>
                    <button className="cancel" type="button" onClick={() => toggleTitlePopup()}>Cancel</button>
                    <br/>
                    <button className="save" type="submit">Save</button>
                </form>
            </div>}
            {isEditBodyOpen && <div className="edit-container">
                <form onSubmit={editPostBody}>
                    <label htmlFor="edit">Edit Post Body</label>
                    <br/>
                    <input id="edit" name="username" type="text"
                           value={editBody}
                           onChange={handleBodyChange}/>

                    <br/><br/>
                    <button className="cancel" type="button" onClick={() => toggleBodyPopup()}>Cancel</button>
                    <br/>
                    <button className="save" type="submit">Save</button>
                </form>
            </div>}


            <h3 className='postBody'>
                {post.body}
                <button className="edit" onClick={toggleBodyPopup}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            </h3>
            {displayCount < comments.length &&
                <button className='centerButton' onClick={(e) => setDisplayCount(displayCount + 3)}>Show Comments</button>}
            {displayCount >= comments.length && <button className='centerButton' onClick={(e) => setDisplayCount(0)}>Hide Comments</button>}
            {comments.slice(0, displayCount).map(comment => <Comment data={comment} key={comment.id} body={comment.body}
                                                                     name={comment.name}
                                                                     delteComment={()=>deleteComment(comment)} editComment={editComment}/>)}

            <br/>
            <br/>
            <form onSubmit={handleAddComment}>
                <input id="comment"
                       name="comment"
                       type="text"
                          placeholder="Add Comment"
                       value={comment}
                       onChange={handleChange}/>
                <br/><br/>

                <button type="submit" onClick={(e) => {
                }}>Add Comment
                </button>
            </form>
        </div>
    );
}

const Comment = (props) => {
    const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
    const [task, setTask] = useState(props.body);

    const toggleCommentPopup = () => {
        setIsEditCommentOpen(!isEditCommentOpen);
    }
    const handleChange = (ev) => {
        setTask(ev.target.value)
    };
    const editComment = (ev) => {
        ev.preventDefault()

        const newComment = {...props.data};

        newComment.body = task;
        props.editComment(newComment)
        toggleCommentPopup()
    }

    return (
        <div className='comment'>
            <span className='commentName'>{props.name}</span>
            <span> said:</span>
            <p>{props.body}</p>
            <button className="edit" onClick={toggleCommentPopup}>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button className="delete" onClick={props.delteComment}>
                <i className="far fa-trash-alt"></i>
            </button>
            {isEditCommentOpen && <div className="edit-container">
                <form onSubmit={editComment}>
                    <label htmlFor="edit">Edit Comment</label>
                    <br/>
                    <input id="edit" name="username" type="text"
                           value={task}
                           onChange={handleChange}/>

                    <br/><br/>
                    <button className="cancel" type="button" onClick={() => toggleCommentPopup()}>Cancel</button>
                    <br/>
                    <button className="save" type="submit">Save</button>
                </form>
            </div>}
        </div>
    );
}

export default Post;