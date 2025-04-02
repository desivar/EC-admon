const Student = require('../models/Student');
const Ward = require('../models/Ward');

exports.createStudent = async (req, res) => {
    try {
        const { name, contactNumber, ward } = req.body;

        if (!name || !ward) {
            return res.status(400).json({ message: 'Name and ward are required.' });
        }

        const wardExists = await Ward.findById(ward);
        if (!wardExists) {
            return res.status(400).json({ message: 'Invalid ward ID.' });
        }

        const newStudent = new Student({
            name,
            contactNumber,
            ward
        });

        const savedStudent = await newStudent.save();

        res.status(201).json({ message: 'Student created successfully', student: savedStudent });

    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Failed to create student', error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        // Logic to get all students
        res.status(200).json([]);
    } catch (error) {
        console.error('Error getting all students:', error);
        res.status(500).json({ message: 'Failed to get students' });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        // Logic to get a student by ID
        res.status(200).json({});
    } catch (error) {
        console.error('Error getting student by ID:', error);
        res.status(500).json({ message: 'Failed to get student' });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        // Logic to update a student
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Failed to update student' });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        // Logic to delete a student
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Failed to delete student' });
    }
};

module.exports = exports;