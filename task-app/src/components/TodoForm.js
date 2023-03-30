import React, { useState } from 'react';

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    }
     
    const handleChange = e => {
        setValue(e.target.value);
    }

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type="text" className='todo-input' value={value} placeholder='What is the task today?' onChange={handleChange} />
            <button type='submit' className='todo-btn'>Add Task</button>
        </form>
    )
}

export default TodoForm;