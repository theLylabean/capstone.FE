import { Link } from "react-router-dom";
import "../pages/Navbar.css";

export default function Navbar({theme, setTheme}) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/events">Events</Link>
      </div>
      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </nav>
  );
}
