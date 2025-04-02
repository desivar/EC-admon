const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

// Route to create a new student (POST /api/students)
router.post('', StudentController.createStudent);

// Route to get all students (GET /api/students)
router.get('', StudentController.getAllStudents);

// Route to get a specific student by ID (GET /api/students/:id)
router.get('/:id', StudentController.getStudentById);

// Route to update an existing student by ID (PUT /api/students/:id)
router.put('/:id', StudentController.updateStudent);

// Route to delete an existing student by ID (DELETE /api/students/:id)
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;