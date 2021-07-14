import React, { useState, useEffect } from 'react'
import { uuid } from './random'
import TodoList from './TodoList'
import './App.css'

const STORAGE_KEY ='todos'

function App() {
  // const fakeData=[
  //   {id:1, name:"Todo1", completed:false},
  //   {id:2, name:"Todo2nd", completed:false}
  // ]
  const [todos, setTodos]=useState([]);
  useEffect(()=>{
    const fromLocalStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if(fromLocalStorage)
      setTodos(fromLocalStorage)
  },[])

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo=(e)=>{
    e.preventDefault();
    const inputTodoName = e.target.elements.addTodoInput.value;

    if(inputTodoName!==''){
      setTodos(prev=>[...prev, {id:uuid(), name:inputTodoName, completed:false}])
      e.target.elements.addTodoInput.value=null;
    }
  }

  const toggleTodo=(id)=>{
    const newTodos = [...todos];
    const todo = newTodos.find(item=>item.id===id);
    todo.completed=!todo.completed;
    setTodos(newTodos);
  }

  const clearTodos =()=>{
    const newTodos = todos.filter(item=>!item.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <div className='card'>
          <h2>Your Todos</h2>
          <TodoList todos={todos.filter(item=>!item.completed)} toggleTodo={toggleTodo}/>
          <TodoList todos={todos.filter(item=>item.completed)} toggleTodo={toggleTodo}/>
          <hr/>
          <form onSubmit={addTodo}>
          <div className='leftTodos'>{todos.filter(item=>!item.completed).length} todo left</div>
          <input className="addTodo" type="text" name="addTodoInput" placeholder="Add todos by typing here and hit Enter" />
          {/* <button type='submit'>Add Todo</button> */}
          </form>
          <button className="clearTodo" onClick={clearTodos}>Delete Completed Todos</button>
          {/* <h2>Completed Todos</h2> */}
      </div>
    </>
  )
}

export default App;
