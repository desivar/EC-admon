// backend/server.js (Example - check your file)
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
connectDB();
app.use(express.json());

app.use('/api/auth', userRoutes); // Make sure this is BEFORE app.get('/')

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

