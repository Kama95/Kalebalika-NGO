const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
const { type } = require('os');
//const userRoutes = require('./routes/UserRoute.js');


const app = express();
const port = 3000 || process.env.PORT;

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//connect to MongoDB

mongoose.connect('mongodb://localhost:27017/NGO');

const donationSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    donationType:String,
    paymentMethod:String,
    amount:Number,
    date:{type: Date, default: Date.now}
});
const Donation = mongoose.model('Donation', donationSchema);

//routes

app.post('/donate', async(req, res)=>{
  try{
    const { firstName, lastName, email, amount, phone, donationType, paymentMethod } = req.body;

    console.log(req.body);
    const donation = new Donation({firstName, lastName, email, amount, phone, donationType, paymentMethod,});


    await donation.save();
    res.status(201).send({message: "Donation saved successfully"});
  } catch (error) {
    res.status(400).send({error:"Error saving donation"});
  }
});

//app.use('/signup', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });