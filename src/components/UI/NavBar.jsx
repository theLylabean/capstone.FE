import { Link, useNavigate } from "react-router-dom";
import "../../pages/Navbar.css";

export default function Navbar({ currentUser, setCurrentUser, theme, setTheme }) {
  const navigate = useNavigate();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/events">Events</Link>
        { currentUser ? (
          <>
            <Link to='/account'>Account</Link>
            <button
              className='logout-button'
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Sign Up</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </nav>
  );
}