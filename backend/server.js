

const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
connectDB();
app.use(express.json());

app.use('/api/auth', userRoutes); // This should come BEFORE the app.get('/')

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!'); // Or 'Hello World!' if that's what you have
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});