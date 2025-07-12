
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPostsPage from "./pages/AllPostsPage";
import { useEffect, useState } from 'react';
import { Navigate} from 'react-router-dom';
import Register from './components/users/Register.jsx';
import Login from './components/users/Login.jsx';
import Account from './components/users/Account.jsx';
//import Home from './components/UI/Home.jsx';
import NavBar from './components/UI/NavBar.jsx';
import Footer from './components/UI/Footer.jsx';
import Events from './components/events/Events.jsx';
import Resources from './components/resources/Resources.jsx';
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
          <Route path='/events' element={<Events token={token}/>}/>
          <Route path='/resources' element={<Resources token={token}/>} />
        </Routes>
      </main>
      <Footer />

    </>
  );
}

export default App;
