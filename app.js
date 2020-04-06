const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Middlewares
// app.use('/posts', () => {
//     console.log('This is a middleware running')
// })

//ROUTES
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/post', postRoutes);

app.get('/posts', (req, res) => {
    res.send('Hello Node Post..Js');
})

//
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },  () => {
    console.log('connected to db');
})

//Listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server is listening in ' + PORT));