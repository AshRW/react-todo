import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
    return (
        <div className="control-group">
        {todos.map(item=>{
            return <Todo key={item.id} todo={item} toggleTodo={toggleTodo}/>
        })}
        </div>
    )
}
