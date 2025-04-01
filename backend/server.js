console.log('Starting server...');
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const testRoutes = require('./routes/testRoutes');

require('dotenv').config();
connectDB();
app.use(express.json());

console.log('Type of testRoutes:', typeof testRoutes);
console.log('testRoutes object:', testRoutes);
app.use('/api/test', testRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});