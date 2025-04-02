console.log('Starting server...');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT for deployment
const connectDB = require('./config/database');
const stakeRoutes = require('./routes/stakeRoutes'); // Import stake routes
const userRoutes = require('./routes/userRoutes');
const wardRoutes = require('./routes/wardRoutes'); // Import ward routes

require('dotenv').config();
connectDB();
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/stakes', stakeRoutes); // Mount stake routes at /api/stakes
app.use('/api/wards', wardRoutes);   // Mount ward routes at /api/wards

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});