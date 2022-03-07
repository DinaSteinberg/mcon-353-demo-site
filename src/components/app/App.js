import './App.css';
import React, { useState } from "react";
import {Home} from '../home/Home';
import {Header} from '../header/header';
import {TodoContext} from '../todo/TodoContext';
import {Todo} from '../todo/Todo';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {

  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    const newTodos = [...todos, todo];

    setTodos(newTodos);
  }

  function removeTodo(deletedTodo) {
    setTodos(todos.filter((todo) => todo !== deletedTodo));
  }

  function completeTodo(completedTodo) {
    let updatedTodos = todos.map((todo) => {
      if (todo === completedTodo) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div>
       <TodoContext.Provider
        value={{
          todos,
          addTodo,
          removeTodo,
          completeTodo,
        }} 
        > 
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/todo" element={<Todo />} />
            </Routes>
          </BrowserRouter>
        </TodoContext.Provider>
     </div>
  );
}

export default App;
