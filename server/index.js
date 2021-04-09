const express = require('express');
const cors = require('cors');
const app = express();
//Routes
const report = require('./routes/report');
//Erros middlewares
const handleErrors = require("./errors/handleErrors");

//Middlewares
app.use(cors());
app.use(express.json());
require('dotenv').config();

//Routes
app.use('/', report);

//Errors
app.use(handleErrors);

//Assign port
app.set('port', 5001);

//Server
app.listen(app.get('port'), () => {
    console.log(`Running on port ${app.get('port')}!`);
});