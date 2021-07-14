import React, { useState, useEffect } from 'react'
import { uuid } from './random'
import TodoList from './TodoList'

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
      <h2>Todos</h2>
      <TodoList todos={todos.filter(item=>!item.completed)} toggleTodo={toggleTodo}/>
      <form onSubmit={addTodo}>
      <input type="text" name="addTodoInput"/>
      <button type='submit'>Add Todo</button>
      </form>
      <button onClick={clearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(item=>!item.completed).length} todo left</div>
      <hr />
      <h2>Completed Todos</h2>
      <TodoList todos={todos.filter(item=>item.completed)} toggleTodo={toggleTodo}/>
    </>
  )
}

export default App;
