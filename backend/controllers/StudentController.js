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
        const students = await Student.find().populate('ward'); // <--- ADD THIS LINE
        res.status(200).json(students);                       // <--- AND THIS LINE
    } catch (error) {
        console.error('Error getting all students:', error);
        res.status(500).json({ message: 'Failed to get students', error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate('ward').populate('teachers'); // <--- ADD THIS LINE
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' }); // <--- AND THIS LINE
        }
        res.status(200).json(student);                                         // <--- AND THIS LINE
    } catch (error) {
        console.error('Error getting student by ID:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid student ID format.' }); // <--- AND THIS LINE
        }
        res.status(500).json({ message: 'Failed to get student', error: error.message }); // <--- AND THIS LINE
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