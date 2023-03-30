import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';
uuidv4();

const TodoWrapper = () => {
    const [todos, setTodos] = useState(() => {
        const initialValue = JSON.parse(localStorage.getItem('todos'));
        return initialValue || [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (todo) => {
        if (todo.trim() === '') {
            alert("Hi mate, your task is empty!")
        } else {
            setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }])
        }
    }
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }
    const editTask = (task, id) => {
        if (task.trim() === '') {
            alert("Hi mate, your updated task is empty!")
        } else {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo))
        }
    }

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    let date = today.getDate();
    let day = weekday[today.getDay()];
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    const dis = `${date} ${month} ${year}`
    const dis2 = `${day}`
    return (
        <div className='TodoWrapper'>
            <h1>Personal Task List</h1>
            <div className='container'>
                <h4>{dis}</h4>
                <h4>{dis2}</h4>
            </div>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) :
                    (
                        <Todo task={todo} key={index}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo} />)
            ))}
        </div>
    )
}

export default TodoWrapper;