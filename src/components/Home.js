import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Home = () => {
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Hello, {username}!</h1>
        <p className="lead">Welcome to the Admin Panel</p>
        <hr className="my-4" />
      </div>
    </div>
  );
};

export default Home;
