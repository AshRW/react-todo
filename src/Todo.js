import React from 'react'
import './index.css'

export default function Todo({todo, toggleTodo}) {
    const handleToggle =()=>{
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label className="control control-checkbox">
            <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
            {todo.name}
            <div className="control_indicator"></div>
            </label>
        </div>
    )
}
