const  express = require ('express');
const User = require('../models/User');

const router = express.Router();


router.post ('/signup', async (req, res)=> {
    try{
    const { firstName, lastName, email, passsword}  = req.body;
    const user = new User ({ firstName, lastName, email, passsword });

 await user.save();
 res.status(201).send({message:"Sign Up successful"});
} catch(error){
    res.status(400).send({error:"Error signing up"})
}
})

module.exports = router;