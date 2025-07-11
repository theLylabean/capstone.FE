import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <link to="/">Home</link>
      <Link to="/about">About</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/events">Events</Link>
    </nav>
  );
}
