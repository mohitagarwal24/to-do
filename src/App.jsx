import React, { useState, useEffect } from "react";
import { TodoForm, TodoItem } from "./components";
import { TodoProvider } from "./context";

function App() {
  const [todos, setTodos] = useState([])

  const addTodos = (todo) => {
   setTodos((prevTodos)=> [{id: Date.now(), ...todo}, ...prevTodos])
  }

  const updateTodo = (id, todo) => {
    setTodos((prevTodos) => prevTodos.map((item)=> item.id === id ? todo : item))
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const toggleCompleted = (id) => {
    setTodos((prevTodos) => prevTodos.map((item) => item.id === id ? {...item, completed: !item.completed} : item));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0 ) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))  
  }, [todos])
  
  

  return (
    <TodoProvider value={{todos, addTodos, deleteTodo, updateTodo, toggleCompleted}}>
      <div className="bg-slate-900 w-screen h-screen px-80 pt-20 text-white">
        <h1 className="text-center text-4xl mb-7 font-bold font-mono">Manage your Todos</h1>
        <div className="w-full h-10 rounded-lg mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((eachTodo) => {
            return(
              <div key={eachTodo.id} className="w-full">
                <TodoItem todo={eachTodo} />
              </div>
            )
          })}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
