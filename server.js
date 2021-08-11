const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const routes = require('./controllers/routes');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.use('/api', routes);

const PORT = 8080;

app.listen(PORT, () => {console.log(`server running on port: ${PORT}`)})