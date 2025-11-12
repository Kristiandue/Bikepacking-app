import React from 'react';
import './css/App.css';
import "./css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

import EggTimer from './egg-timer';
import Login from './login';
import CommentSection from './CommentSection';



function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1>App</h1>
        <div className='login-content'>
          <Login/>
          <ul className="hidden">
            <li><a className='bi bi-inbox' href="#inbox">Inbox</a></li>
            <li><a href="navigation">Nav</a></li>
            <li><i className="bi bi-gear-wide" aria-hidden="true"></i></li>
          </ul>
        </div>
        <div id="dropdown-menu" className="bi bi-list">
          <div id="dropdown-contents" className="hidden">
            <EggTimer/>
          </div>
        </div>
      </div>
      <CommentSection/>
    </div>
  );
}

export default App;