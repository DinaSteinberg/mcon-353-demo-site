import './App.css';
import React from "react";
import {Home} from '../home/Home';
import TodoList from '../todo_youTube/TodoList';
import {Header} from '../header/header';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div>
     
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
