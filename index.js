const express = require('express');
const app = express();
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');



app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))

app.use('/auth' , authRoutes);
app.use('/admin' , adminRoutes);
app.use('/user' , userRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT , () => {
    console.log("The sever is live now ");
})