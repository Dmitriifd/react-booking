import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

import './navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          React Booking
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <Link to="register" className="navButton">Register</Link>
            <Link to='login' className="navButton">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
