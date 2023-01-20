import './App.css';
import NavigationBar from './components/nav';
import { Outlet } from 'react-router-dom';
import { useState, createContext } from 'react';

function App(props) {
  return (
    <div className="App">
        <NavigationBar logout={props.logout} />
        <Outlet />
    </div>
  );
}

export default App;
