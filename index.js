const express = require('express');
const cors = require('cors');
const { connectDb } = require('./src/config');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
connectDb();


app.use('/v1', require('./src/api/routes'));
const port = 8000;

app.listen(port, () => {
    console.log(`Server started on http:localhost:${port}`);
});