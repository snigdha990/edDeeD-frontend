import { useState } from 'react';
import logo from '../assets/images/edDeed-logo.png';
import { Link } from 'react-router-dom';
import { SignInButton } from '@clerk/clerk-react';

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <div className="navbar-menu">
          <Link to="/schools" className="navbar-item">SCHOOLS</Link>
          <Link to="/beyond-school" className="navbar-item">BEYOND SCHOOL</Link>
          <Link to="/edjobs" className="navbar-item">EDJOBS</Link>
          <Link to="/consultation" className="navbar-item">CONSULTATION</Link>
          <Link to="/videos" className="navbar-item">VIDEOS</Link>
          <Link to="/blogs" className="navbar-item">BLOGS</Link>
          <Link to="/more" className="navbar-item">MORE</Link>
          <Link to="/suggest-school" className="navbar-item">ADD A SCHOOL</Link>
          <Link to="/admin/suggestions" className="navbar-item">ADMIN PANEL</Link>
        </div>

        <div className="navbar-auth">
          <SignInButton mode="modal">
            <button
              className="signin-btn"
            >
              Sign-In/Register
            </button>
          </SignInButton>
        </div>
      </nav>
    </>
  );
}
