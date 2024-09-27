const express = require('express');
const Employee = require('../model/Employee');
const upload = require('../middleware/multer');
const router = express.Router();

// Helper function to check for token
const checkAuth = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  return token;
};

// GET /employees - Fetch all employees
router.get('/', async (req, res) => {
  const token = checkAuth(req, res);
  if (!token) return;

  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// POST /employees - Create a new employee
router.post('/', upload.single('image'), async (req, res) => {
  const token = checkAuth(req, res);
  if (!token) return;

  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file?.path;

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: course.split(','), // Assuming course will come as a string in a form of an array
      image
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /employees/:id - Update employee
router.put('/:id', upload.single('image'), async (req, res) => {
  const token = checkAuth(req, res);
  if (!token) return;

  const employeeId = req.params.id;
  const updates = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course ? req.body.course.split(',') : [],
    image: req.file?.path,
  };

  try {
    const employee = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// DELETE /employees/:id - Delete employee
router.delete('/:id', async (req, res) => {
  const token = checkAuth(req, res);
  if (!token) return;

  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

module.exports = router;
