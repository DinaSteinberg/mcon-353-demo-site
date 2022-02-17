import './App.css';
import React, {useState} from "react";
import {Home} from '../home/Home';
import {TodoInput} from '../todo/TodoInput';



function App() {

  return (
    <div>
      <Home/>
      <TodoInput/>
    </div>
  );
}

export default App;
