// backend/server.js
console.log('Starting server...');
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const englishConnectRoutes1 = require('./routes/englishConnectRoutes1');
const englishConnectRoutes2 = require('./routes/englishConnectRoutes2');
const englishConnectRoutes3 = require('./routes/englishConnectRoutes3');
const stakeRoutes = require('./routes/stakeRoutes'); // Import stake routes

require('dotenv').config();
connectDB();
app.use(express.json());

console.log('Type of userRoutes:', typeof userRoutes);
console.log('userRoutes object:', userRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/englishconnect/1', englishConnectRoutes1);
app.use('/api/englishconnect/2', englishConnectRoutes2);
app.use('/api/englishconnect/3', englishConnectRoutes3);

// Place the stake routes here, after importing and before your app.listen()
app.use('/api/stakes', stakeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});