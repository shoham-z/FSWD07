import '../../styles/todo.css'
import {useState} from "react";


const Todo = (props) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [task, setTask] = useState(props.data.title);

    const togglePopup = () => {
        setIsEditOpen(!isEditOpen);
    };


    const editTodo = (ev) => {
        ev.preventDefault()

        const newTodo = props.data;
        newTodo.title = task;
        props.editTodo(newTodo)
        togglePopup()
    }

    const handleChange = (ev) => {
        setTask(ev.target.value)
    };

    const todo = `todo${props.data.id}`

    return (
        <div className='todo'>
            <input type="checkbox" defaultChecked={props.data.completed} id={todo} name={todo}
                   onClick={props.toggleComplete}/>
            <label htmlFor="todo"> {props.data.title}</label><br/>
            <div className= "button-container">
            <button className="edit" onClick={togglePopup}>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button className="delete" onClick={props.deleteTodo}>
                <i className="far fa-trash-alt"></i>
            </button>
            </div>
            {isEditOpen && <div className="edit-container">
                <form onSubmit={editTodo}>
                    <label htmlFor="edit">Edit task</label>
                    <br/>
                    <input id="edit" name="username" type="text"
                           value={task}
                           onChange={handleChange}/>

                    <br/><br/>
                    <button className="cancel" type="button" onClick={()=>togglePopup()}>Cancel</button>
                    <br/>
                    <button className="save" type="submit">Save</button>
                </form>
            </div>}
        </div>
    );
}

export default Todo;