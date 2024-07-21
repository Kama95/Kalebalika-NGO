const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
const { type } = require('os');

const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());
app.use(cors());

//connect to MongoDB

mongoose.connect('mongodb://localhost:127001/donations',{useNewUrlParser: true, useUnifiedTopology: true});

const donationSchema = new mongoose.Schema({

    name:String,
    email:String,
    amount:Number,
    date:{type:date, default: Date.now}
});

const Donation = mongoose.model('Donation', donationSchema)