import React from 'react'

export default function Todo({todo, toggleTodo}) {
    const handleToggle =()=>{
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
            <input type="checkbox" checked={todo.completed} onChange={handleToggle}/>
            {todo.name}
            </label>
        </div>
    )
}
