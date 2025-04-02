console.log('Starting server...');
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const stakeRoutes = require('./routes/stakeRoutes'); // Import stake routes
const userRoutes = require('./routes/userRoutes');
const wardRoutes = require('./routes/wardRoutes'); // Import ward routes
const teacherRoutes = require('./routes/teacherRoutes'); // Import teacher routes <--- ADD THIS LINE

require('dotenv').config();
connectDB();
app.use(express.json());

app.use('/api/stakes', stakeRoutes); // Mount stake routes at /api/stakes
app.use('/api/users', userRoutes);
app.use('/api/wards', wardRoutes);
app.use('/api/teachers', teacherRoutes); // Mount teacher routes at /api/teachers <--- ADD THIS LINE

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});