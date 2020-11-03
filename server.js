const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(3000, console.log('Server is running on port 3000'));
