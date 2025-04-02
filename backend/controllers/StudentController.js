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
        const students = await Student.find().populate('ward');
        res.status(200).json(students);
    } catch (error) {
        console.error('Error getting all students:', error);
        res.status(500).json({ message: 'Failed to get students', error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate('ward').populate('teachers');
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error getting student by ID:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid student ID format.' });
        }
        res.status(500).json({ message: 'Failed to get student', error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Optional: Add validation to ensure only allowed fields are updated
        const allowedUpdates = ['name', 'contactNumber', 'ward', 'englishConnect1Progress', 'englishConnect2Progress', 'englishConnect3Progress', 'teachers', 'notes'];
        const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates!' });
        }

        // If trying to update the ward, validate the new ward ID
        if (updates.ward) {
            const wardExists = await Ward.findById(updates.ward);
            if (!wardExists) {
                return res.status(400).json({ message: 'Invalid new ward ID.' });
            }
        }

        const student = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('ward').populate('teachers');

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student updated successfully', student });

    } catch (error) {
        console.error('Error updating student:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid student ID format.' });
        }
        res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {
        console.error('Error deleting student:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid student ID format.' });
        }
        res.status(500).json({ message: 'Failed to delete student', error: error.message });
    }
};

module.exports = exports;