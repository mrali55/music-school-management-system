const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/default');
const app=express();

// passport config


app.use(express.json());
const db = config.mongoURI;

mongoose.connect(db)
    .then(()=>console.log('connected to Database from the new server!'))
    .catch((e)=>console.log('Oh No! '+e));






app.use('/',require('./routes/index'));
app.listen(5000);