import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccount } from "./api/usersIndex.js";
import AllPostsPage from "./pages/AllPostsPage.jsx";
import Register from "./components/users/Register.jsx";
import Login from "./components/users/Login.jsx";
import Account from "./components/users/Account.jsx";
import About from "./components/UI/About.jsx";
import Navbar from "./components/UI/NavBar.jsx";
import Events from "./components/events/Events.jsx";
import Resources from "./components/resources/Resources.jsx";
import PostDetailsPage from "./pages/PostDetailsPage.jsx";
//import Footer from "./components/UI/Footer.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);

  // On load, you could even load from localStorage:
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        if (!token) return;
        try {
          const response = await getAccount();
          setCurrentUser(response);
        } catch (error) {
          console.error('Failed to fetch user in App: ', error.message);
          setCurrentUser(null);
        }
      }
      getUser();
    }
  }, [token]);

  return (
    <>
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}  
      />
      <main className="app-content">
        <Routes>
  {       /*  <Route path="/" element={<AllPostsPage />} /> */}
          <Route path="/" element={<AllPostsPage token={token} currentUser={currentUser} />} />
          <Route 
            path="/register" 
            element={
              <Register 
              setCurrentUser={setCurrentUser}  
              setToken={setToken}
              />
            } 
          />
          <Route
            path="/login"
            element={
              <Login 
                setCurrentUser={setCurrentUser} 
                setToken={setToken} 
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/account"
            element={
              token ? (
                <Account token={token} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/events" element={<Events token={token} />} />
          <Route path="/resources" element={<Resources token={token} />} />
          <Route
            path="/posts/:id"
            element={<PostDetailsPage token={token} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
