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

mongoose.connect('mongodb://localhost:27017/donations');

const donationSchema = new mongoose.Schema({

    firstName:String,
    lastName: String,
    email:String,
    amount:Number,
    date:{type: Date, default: Date.now}
});

const Donation = mongoose.model('Donation', donationSchema);

//routes

app.post('/donate', async(req, res)=>{
    const {name, email, amount} = req.body;
    const donation = new Donation({name,email,amount});

try{
    await donation.save();
    res.status(201).send(donation);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });