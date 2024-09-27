import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EditEmp from './components/EditEmp';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername || ''); // Set username if exists
    }
    setLoading(false); // End loading once token is checked
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove username on logout
    setIsAuthenticated(false);
    setUsername(''); // Clear username from state
  };

  if (loading) {
    return <div>Loading...</div>; // Fixed typo from 'diav' to 'div'
  }

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar username={username} onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={<Home />} /> {/* Added Home route */}
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/edit-employee/:id" element={<EditEmp />} />
            <Route path="*" element={<Navigate to="/employees" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
