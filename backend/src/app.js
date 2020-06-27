const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const expensesRoutes = require('./routes/expense-routes');

const app = express();
const PORT = 3000;


//Database connection & setting server, listening at PORT 
mongoose.connect('mongodb://localhost:27017/testRepo4', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Node server is listening at http://localhost:${PORT}`);
        });
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log(`Connection failed ${error}`);
    });

// parse application/json
app.use(bodyParser.json());

// parse application x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors());

// routes
app.use('/api/expense', expensesRoutes);