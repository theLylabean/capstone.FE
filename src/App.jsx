
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPostsPage from "./pages/AllPostsPage";
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/users/Register.jsx';
import Login from './components/users/Login.jsx';
import Account from './components/users/Account.jsx';
import Home from './components/UI/Home.jsx';
import NavBar from './components/UI/NavBar.jsx';
import Footer from './components/UI/Footer.jsx';
import './css/App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  })


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  
  return (
    <>
      <NavBar />
      <main className='app-content'>
        <Routes>
          <Route path='/' element={ <AllPostsPage /> } />
          <Route path='/register' element={ <Register /> } />
          <Route 
            path='/login' 
            element={ 
              <Login 
                setUser={setUser}
                setToken={setToken}
              /> 
            } 
          />
          <Route 
            path='/account' 
            element={ 
              token ? <Account 
                        token={token}
                        user={user}
                        setUser={setUser} 
                      /> : <Navigate to='/login' replace />
            } 
          />
        </Routes>
      </main>
      <Footer />

    </>
  );
}

export default App;
