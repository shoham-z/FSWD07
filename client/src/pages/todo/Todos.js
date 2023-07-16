import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Todo from "./Todo";
import exp from "../../App";
import '../../styles/todos.css'
import config from '../../config';


const Todos = () => {
    const routeParams = useParams();
    const [userTodos, setUserTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const {currentUserId} = useContext(exp.CurrentUserContext);

    const selectOptions = [
        {
            label: "By Id",
            value: "index",
        },
        {
            label: "Completed First",
            value: "completed",
        },
        {
            label: "Completed Last",
            value: "completed-reversed",
        },
        {
            label: "Alphabetically",
            value: "alphabet",
        },
        {
            label: "Random",
            value: "random",
        },
    ];
    const selectChanged = (event) => {
        let order = event.target.value;
        let compareFn;

        if (order === "random") {
            compareFn = () => Math.random() - 0.5;
        } else if (order === "alphabet") {
            compareFn = (a, b) => a.title.localeCompare(b.title);
        } else if (order === "index") {
            compareFn = (a, b) => a.id - b.id;
        } else if (order === "completed-reversed") {
            compareFn = (a, b) => {
                if (a.completed !== b.completed) {
                    return a.completed - b.completed;
                } else {
                    return a.id - b.id;
                }
            };
        } else if (order === "completed") {
            compareFn = (a, b) => {
                if (a.completed !== b.completed) {
                    return b.completed - a.completed;
                } else {
                    return a.id - b.id;
                }
            };
        }
        const sortedTodos = userTodos.slice().sort(compareFn)
        setUserTodos(sortedTodos)
    };

    const toggleTodo = (todo) => {
        const index = userTodos.indexOf(todo);
        userTodos[index].completed = !userTodos[index].completed;
        //save to server
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/todos/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        id: todo.id,
                        completed: todo.completed
                    })
                });
        }
        fetchData().then(_r => console.log)
    };

    const deleteTodo = (todo) => {
        let newArray = userTodos.filter((t) => t.id!==todo.id);
        setUserTodos(newArray)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/todos/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        id: todo.id
                    })
                });

        }

        fetchData().then(_r => console.log)
    }

    const editTodo = (todo) => {
        delete todo["data"]
        delete todo["_id"]

        // userTodos.find(t => t.id===todo.id)

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/todos/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(todo)
                });
        }
        fetchData().then(_r => console.log(_r))
    }


    useEffect(() => {
        let fetchData = async () => {
            const response = await fetch(`${config.uri}/todos?userId=${currentUserId}`);
            setUserTodos(await response.json())
        }
        fetchData().then(_r => console.log)
    }, [currentUserId,todo]);

    const handleAddTodo = (event) => {
        event.preventDefault();

        let fetchData = async () => {
            const response = await fetch(`${config.uri}/todos/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        userId: currentUserId,
                        completed: false,
                        title: todo
                    })
                });
            return response
        }
        // fetchData()
        let fetchDatares = async () => {
            await fetchData()
            const response = await fetch(`${config.uri}/todos?userId=${currentUserId}`);
            let res = await response.json()
            setUserTodos(res)
        }
        fetchDatares().then(_r => console.log)
        console.log(todo)
    }

    const handleChange = (event) => {
        event.preventDefault();

        setTodo(event.target.value);


    }
    return <div>
        <div className='header'>
            <h2 className='description'>{routeParams.username}'s todo list</h2>
        </div>
        <div className='todos'>
            <form onSubmit={handleAddTodo}>
                <input id="todo"
                       name="todo"
                       type="text"
                       placeholder={"Add todo"}
                       value={todo}
                       onChange={handleChange}/>
                <br/>

                <button type="submit">Add Todo</button>
                <br/><br/>
            </form>
            <select onChange={selectChanged}>
                {selectOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <br/>
            {userTodos.map((todo) => <Todo data={todo} key={todo.id}
                                           toggleComplete={() => toggleTodo(todo)}
                                           deleteTodo={() => deleteTodo(todo)}
                                           editTodo={editTodo}/>)}
        </div>
    </div>;
};

export default Todos;