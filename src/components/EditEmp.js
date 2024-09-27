import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      course: checked
        ? [...prev.course, value]
        : prev.course.filter((c) => c !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('name', employee.name);
      form.append('email', employee.email);
      form.append('mobile', employee.mobile);
      form.append('designation', employee.designation);
      form.append('gender', employee.gender);
      form.append('course', JSON.stringify(employee.course));
      if (employee.image) {
        form.append('image', employee.image);
      }

      await axios.put(`http://localhost:4000/employees/${id}`, form);
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Edit Employee</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mobile" className="form-label">Mobile No</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          className="form-control"
          value={employee.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="designation" className="form-label">Designation</label>
        <select
          id="designation"
          name="designation"
          className="form-select"
          value={employee.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <fieldset className="mb-3">
        <legend className="col-form-label">Gender:</legend>
        <div>
          <div className="form-check">
            <input
              type="radio"
              id="genderM"
              name="gender"
              value="M"
              className="form-check-input"
              checked={employee.gender === 'M'}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="genderM">Male</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="genderF"
              name="gender"
              value="F"
              className="form-check-input"
              checked={employee.gender === 'F'}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="genderF">Female</label>
          </div>
        </div>
      </fieldset>
      <div className="mb-3">
        <label className="form-label">Course:</label>
        <div>
          <div className="form-check">
            <input
              type="checkbox"
              id="courseMCA"
              value="MCA"
              className="form-check-input"
              checked={employee.course.includes('MCA')}
              onChange={handleCourseChange}
            />
            <label className="form-check-label" htmlFor="courseMCA">MCA</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="courseBCA"
              value="BCA"
              className="form-check-input"
              checked={employee.course.includes('BCA')}
              onChange={handleCourseChange}
            />
            <label className="form-check-label" htmlFor="courseBCA">BCA</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="courseBSC"
              value="BSC"
              className="form-check-input"
              checked={employee.course.includes('BSC')}
              onChange={handleCourseChange}
            />
            <label className="form-check-label" htmlFor="courseBSC">BSC</label>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Upload Image</label>
        <input
          type="file"
          id="image"
          className="form-control"
          onChange={(e) => setEmployee((prev) => ({ ...prev, image: e.target.files[0] }))}
        />
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};

export default EditEmp;
