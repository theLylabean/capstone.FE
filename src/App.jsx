import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPostsPage from "./pages/AllPostsPage";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Register from "./components/users/Register.jsx";
import Login from "./components/users/Login.jsx";
import Account from "./components/users/Account.jsx";
//import Home from './components/UI/Home.jsx';
import Navbar from "./components/Navbar.jsx";
//import Footer from "./components/UI/Footer.jsx";
import Events from "./components/events/Events.jsx";
import Resources from "./components/resources/Resources.jsx";
import PostDetailsPage from "./pages/PostDetailsPage.jsx";
import "./css/App.css";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [theme, setTheme] = useState("light");

  // On load, you could even load from localStorage:
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<AllPostsPage />} />
          <Route path="/" element={<AllPostsPage token={token} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} setToken={setToken} />}
          />
          <Route
            path="/account"
            element={
              token ? (
                <Account token={token} user={user} setUser={setUser} />
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
