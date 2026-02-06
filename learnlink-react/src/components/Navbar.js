import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">🏠 Home</Link>
      <Link to="/courses">📚 Courses</Link>
      <Link to="/contact">📞 Contact</Link>
      <Link to="/login">🔐 Login</Link>
      <Link to="/register">📝 Register</Link>
    </nav>
  );
}

export default Navbar;