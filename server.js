const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const items = require('./routes/api/items')


dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
connectDB();
const app = express();

//Bodyparser middleware
app.use(bodyParser.json());
app.use('/api/items', items);
//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set Static folder
    app.use(express.static('client_side/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client_side', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Server started on port ${port}`));
