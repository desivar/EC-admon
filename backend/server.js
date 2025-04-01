console.log('Starting server...');
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const userRoutes = require('./routes/user.Routes');
const englishConnect1Routes = require('./routes/englishConnect1Routes');
const englishConnect2Routes = require('./routes/englishConnect2Routes');
const englishConnect3Routes = require('./routes/englishConnect3Routes');

require('dotenv').config();
connectDB();
app.use(express.json());

console.log('Type of userRoutes:', typeof userRoutes);
console.log('userRoutes object:', userRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/englishconnect1', englishConnect1Routes);
app.use('/api/englishconnect2', englishConnect2Routes);
app.use('/api/englishconnect3', englishConnect3Routes);

app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});