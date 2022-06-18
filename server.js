const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const items = require('./routes/api/items')

const port = process.env.PORT || 5000;

connectDB();
const app = express();

//Bodyparser middleware
app.use(bodyParser.json());
app.use('/api/items', items);

app.listen(port, () => console.log(`Server started on port ${port}`));
