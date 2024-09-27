import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false); // State to manage redirection

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setCourse((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('mobile', mobile);
    form.append('designation', designation);
    form.append('gender', gender);
    form.append('course', course);
    form.append('image', image);

    await axios.post('http://localhost:4000/employees', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Employee created successfully!');
    setRedirectToHome(true); // Set redirection state to true
  };

  // Redirect if redirection state is true
  if (redirectToHome) {
    return <Navigate to="/employees" />;
  }
  return (
    <form onSubmit={handleSubmit} className="container mt-4">
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input 
      type="text" 
      id="name" 
      className="form-control" 
      placeholder="Name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required 
    />
  </div>
  
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input 
      type="email" 
      id="email" 
      className="form-control" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      required 
    />
  </div>
  
  <div className="mb-3">
    <label htmlFor="mobile" className="form-label">Mobile No</label>
    <input 
      type="text" 
      id="mobile" 
      className="form-control" 
      placeholder="Mobile No" 
      value={mobile} 
      onChange={(e) => setMobile(e.target.value)} 
      required 
    />
  </div>

  <div className="mb-3">
    <label htmlFor="designation" className="form-label">Designation</label>
    <select 
      id="designation" 
      className="form-select" 
      value={designation} 
      onChange={(e) => setDesignation(e.target.value)} 
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
          value="M" 
          className="form-check-input" 
          checked={gender === 'M'} 
          onChange={(e) => setGender(e.target.value)} 
          required 
        />
        <label className="form-check-label" htmlFor="genderM">Male</label>
      </div>
      <div className="form-check">
        <input 
          type="radio" 
          id="genderF" 
          value="F" 
          className="form-check-input" 
          checked={gender === 'F'} 
          onChange={(e) => setGender(e.target.value)} 
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
      onChange={(e) => setImage(e.target.files[0])} 
      required 
    />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

      
  );
};

export default CreateEmployee;