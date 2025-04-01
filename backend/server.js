console.log('Starting server...');
const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/database');
const stakeRoutes = require('./routes/stakeRoutes');


require('dotenv').config();
connectDB();
app.use(express.json());

app.use('/api/stakes', stakeRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the English Connect Backend!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});