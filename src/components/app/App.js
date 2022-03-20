import './App.css';
import React, { useState } from "react";
import {Home} from '../home/Home';
import {Header} from '../header/header';
import {TodoProvider} from '../../state/todo/context';
import {Todo} from '../todo/Todo';
import {Chatbox} from '../chat/chatbox';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {

  

  return (
    <div>
       <TodoProvider> 
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/todo" element={<Todo />} />
              <Route path="/chat" element={<Chatbox />} />
            </Routes>
          </BrowserRouter>
        </TodoProvider>
     </div>
  );
}

export default App;
