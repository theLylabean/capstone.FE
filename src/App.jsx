import { useEffect, useState } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Register from './components/users/Register.jsx';
import Login from './components/users/Login.jsx';
import Account from './components/users/Account.jsx';
import Home from './components/UI/Home.jsx';
import NavBar from './components/UI/NavBar.jsx';
import Footer from './components/UI/Footer.jsx';
import './App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <>
      <Router>
        <NavBar />
        <main className='app-content'>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/login' element={ <Login /> } />
            <Route 
              path='/account' 
              element={ 
                token ? <Account token={token} /> : <Navigate to='/login' replace />
              } 
            />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  )
}

export default App
