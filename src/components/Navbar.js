import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Home</Link> 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/employees">EmployeeList</Link> 
            </li>
          </ul>
          <div className="d-flex align-items-center"> {/* Align items vertically in the center */}
            {username && <span className="navbar-text me-3">{username}</span>} {/* Display username */}
            <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button> {/* Logout Button */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
