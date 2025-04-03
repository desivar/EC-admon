console.log('Starting server...');
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const stakeRoutes = require('./routes/stakeRoutes');
const userRoutes = require('./routes/userRoutes');
const wardRoutes = require('./routes/wardRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const englishConnect1Routes = require('./routes/englishConnect1Routes'); // Import EC1 routes
const englishConnect2Routes = require('./routes/englishConnect2Routes'); // Import EC2 routes
const englishConnect3Routes = require('./routes/englishConnect3Routes'); // Import EC3 routes

require('dotenv').config();
connectDB();
app.use(express.json());

app.use('/api/stakes', stakeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wards', wardRoutes);
app.use('/api/teachers', teacherRoutes);

app.use('/api/students', studentRoutes); // Base route for students

// Mount EnglishConnect routes under /api/students
app.use('/api/students', englishConnect1Routes);
app.use('/api/students', englishConnect2Routes);
app.use('/api/students', englishConnect3Routes);

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});