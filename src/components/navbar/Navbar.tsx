import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">React Booking</Link>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
