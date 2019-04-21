const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/default');
const app=express();

const users=require('./routes/api/users')
app.use(express.json());
const db = config.mongoURI;

mongoose.connect(db)
    .then(()=>console.log('connected to Database!'))
    .catch((e)=>console.log('Oh No! '+e))
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/users',users);

app.listen(5000);