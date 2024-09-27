import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({ key: 'name', direction: 'asc' });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  // Check for token to determine if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false); // Not authenticated
      setLoading(false); // Stop loading if not authenticated
      return; // Exit the effect if not authenticated
    }

    // Fetch employees only if authenticated
    const fetchEmployees = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("http://localhost:4000/employees", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchEmployees(); // Fetch employees when component mounts
  }, []); // Empty dependency array ensures this runs once

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    const direction = sortOrder.key === key && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ key, direction });
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = sortOrder.key === 'date' ? new Date(a.createdAt) : a[sortOrder.key];
    const bValue = sortOrder.key === 'date' ? new Date(b.createdAt) : b[sortOrder.key];

    if (aValue < bValue) return sortOrder.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <p>Loading employees...</p>; // Show loading message
  }

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <div className="d-flex mb-3 align-items-center">
        <Link to="/create-employee" className="btn btn-primary me-2">
          Create Employee
        </Link>
        <input
          type="text"
          placeholder="Search Employee"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control me-2"
          style={{ width: '200px' }}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => handleSort('_id')} style={{ cursor: 'pointer' }}>ID</th>
            <th>Image</th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name</th>
            <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>Email</th>
            <th onClick={() => handleSort('mobile')} style={{ cursor: 'pointer' }}>Mobile No</th>
            <th onClick={() => handleSort('designation')} style={{ cursor: 'pointer' }}>Designation</th>
            <th onClick={() => handleSort('gender')} style={{ cursor: 'pointer' }}>Gender</th>
            <th onClick={() => handleSort('course')} style={{ cursor: 'pointer' }}>Course</th>
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                <img
                  src={`http://localhost:4000/${employee.image}`} // Directly use the image URL
                  alt={employee.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(", ")}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/edit-employee/${employee._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
