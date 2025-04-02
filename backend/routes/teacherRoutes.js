const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route to create a new teacher (POST /api/teachers)
router.post('', UserController.createTeacher);

// Route to get all teachers (GET /api/teachers)
router.get('', UserController.getAllTeachers);

// Route to get a specific teacher by ID (GET /api/teachers/:id)
router.get('/:id', UserController.getTeacherById);

// Route to update an existing teacher by ID (PUT /api/teachers/:id)
router.put('/:id', UserController.updateTeacher);

// Route to delete an existing teacher by ID (DELETE /api/teachers/:id)
router.delete('/:id', UserController.deleteTeacher);

module.exports = router;