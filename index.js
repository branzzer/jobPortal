const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')
require('express-async-errors');  // Now we dont have to use trycatch in controller 
// file imports
const connectDb = require('./config');
const testRoute = require('./routes/test')
const authRoute = require('./routes/auth');
const errorHandlerMiddleware = require('./middlewares/error');

const app = express();
dotenv.config();


app.use(express.json())
app.use(cors());
app.use(morgan('dev'))

app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth', authRoute)

// validation middleware
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDb(process.env.MONGO_URI)
    console.log(`express server is running at port ${PORT}`)
})