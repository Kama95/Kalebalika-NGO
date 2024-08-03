const  express = require ('express');
const User = require('../models/User');

const router = express.Router();


router.post ('/', async (req, res)=> {
    try{
    const { firstName, lastName, email, password}  = req.body;
    const user = new User ({ firstName, lastName, email, password });

 await user.save();
 res.status(201).send({message:"Sign Up successful"});
} catch(error){
    res.status(400).send({error:"Error signing up"})
}
})

module.exports = router;