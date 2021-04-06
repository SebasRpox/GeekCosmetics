const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const report = require('./routes/report');

//Middlewares
app.use(cors());
app.use(express.json());
require('dotenv').config();

//Routes
app.use('/', report);

app.set('port', 5001);

//Server
app.listen(app.get('port'), () => {
    console.log(`Running on port ${app.get('port')}!`);
});